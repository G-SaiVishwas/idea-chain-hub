import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useIdeaDetail from '../hooks/useIdeaDetail.js';
import AIInsightsPanel from '../components/AIInsightsPanel.jsx';
import IdeaChainTree from '../components/IdeaChainTree.jsx';
import CommentSection from '../components/CommentSection.jsx';
import RatingStars from '../components/RatingStars.jsx';
import ForkButton from '../components/ForkButton.jsx';
import { useRatingContext } from '../context/RatingContext.jsx';
import { rateIdea } from '../services/ideaService.js';
import useAuth from '../hooks/useAuth.js';

const IdeaDetailPage = () => {
  const { id } = useParams();
  const { data: idea, isLoading } = useIdeaDetail(id);
  const { ratings, setRating } = useRatingContext();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const localRating = ratings[id];

  const average = useMemo(() => {
    if (!idea) return 0;
    return idea.ratingCount ? idea.ratingSum / idea.ratingCount : 0;
  }, [idea]);

  const ratingMutation = useMutation({
    mutationFn: (score) => rateIdea({ ideaId: id, score }),
    onSuccess: (response) => {
      setRating(id, response.average);
      queryClient.invalidateQueries({ queryKey: ['idea', id] });
    }
  });

  const handleRate = (score) => {
    if (!isAuthenticated) return;
    setRating(id, score);
    ratingMutation.mutate(score);
  };

  if (isLoading) {
    return <div className="py-20 text-center">Loading idea details…</div>;
  }

  if (!idea) {
    return <div className="py-20 text-center text-slate-500">Idea not found.</div>;
  }

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">{idea.title}</h1>
            <p className="text-sm text-slate-500">By {idea.createdBy?.name ?? 'Anonymous'} • Stage: {idea.stage}</p>
          </div>
          <ForkButton ideaId={id} />
        </div>
        <p className="text-slate-600 text-lg leading-relaxed">{idea.description}</p>
        <div className="flex flex-wrap gap-2 text-sm text-primary-600">
          {idea.tags?.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-primary-50 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <div>
          <RatingStars value={localRating || average} onChange={handleRate} readOnly={!isAuthenticated} />
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Evolution</h2>
            <IdeaChainTree idea={idea} />
          </div>
          <CommentSection ideaId={id} />
        </div>
        <AIInsightsPanel feedback={idea.aiFeedback} />
      </section>
    </div>
  );
};

export default IdeaDetailPage;
