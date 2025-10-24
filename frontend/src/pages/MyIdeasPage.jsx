import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth.js';
import apiClient from '../services/apiClient.js';
import { deleteIdea } from '../services/ideaService.js';

const fetchMyIdeas = async (userId) => {
  if (!userId) return [];
  const { data } = await apiClient.get(`/ideas?createdBy=${userId}`);
  const ideas = data?.data;
  return Array.isArray(ideas) ? ideas : [];
};

const MyIdeasPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [feedback, setFeedback] = useState('');

  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ['my-ideas', user?.id],
    enabled: Boolean(user?.id),
    queryFn: () => fetchMyIdeas(user.id)
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-ideas', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['ideas'], exact: false });
      setFeedback('Idea removed successfully.');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete the idea. Please try again.';
      setFeedback(message);
    }
  });

  const sortedIdeas = useMemo(() => {
    if (!Array.isArray(ideas)) {
      return [];
    }
    return ideas.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [ideas]);

  const handleDelete = (id, title) => {
    const confirmed = window.confirm(`Delete "${title}"? This action cannot be undone.`);
    if (!confirmed) return;
    setFeedback('');
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">My published ideas</h1>
        <p className="text-sm text-slate-500">
          Review, edit, or remove ideas you have shared with the IdeaChain community.
        </p>
      </header>

      {feedback && <p className="text-sm text-primary-600 bg-primary-50 border border-primary-100 rounded-lg px-4 py-2">{feedback}</p>}

      {isLoading ? (
        <div className="py-20 text-center text-slate-500">Loading your ideas…</div>
      ) : sortedIdeas.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          You have not published any ideas yet. <Link to="/create" className="text-primary-600 underline">Share one now</Link>.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedIdeas.map((idea) => {
            const average = idea.ratingCount ? (idea.ratingSum / idea.ratingCount).toFixed(1) : '0.0';
            return (
              <article key={idea._id} className="border border-slate-200 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">{idea.title}</h2>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{idea.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-primary-600">
                      {idea.tags?.map((tag) => (
                        <span key={tag} className="bg-primary-50 px-2 py-1 rounded-full">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span className="px-3 py-1 rounded-full bg-slate-100 capitalize">{idea.stage}</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100">⭐ {average}</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100">{idea.forks?.length ?? 0} forks</span>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={`/idea/${idea._id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    View
                  </Link>
                  <Link
                    to={`/create?fork=${idea._id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Fork
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(idea._id, idea.title)}
                    className="text-sm font-medium text-rose-600 hover:text-rose-500"
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? 'Removing…' : 'Delete'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;
