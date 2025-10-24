import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth.js';
import { addComment, getComments, replyToComment } from '../services/commentService.js';

const CommentForm = ({ onSubmit, placeholder = 'Add a comment…' }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
        rows={3}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
      />
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md">
          Post
        </button>
      </div>
    </form>
  );
};

const CommentSection = ({ ideaId }) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['comments', ideaId], queryFn: () => getComments(ideaId), enabled: !!ideaId });

  const commentMutation = useMutation({
    mutationFn: (content) => addComment({ ideaId, content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', ideaId] })
  });

  const replyMutation = useMutation({
    mutationFn: ({ commentId, content }) => replyToComment(commentId, { content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', ideaId] })
  });

  if (!ideaId) return null;

  return (
    <section className="space-y-6">
      <header>
        <h3 className="text-xl font-semibold">Comments</h3>
        <p className="text-sm text-slate-500">Discuss potential, concerns, and execution strategies.</p>
      </header>
      {isAuthenticated ? (
        <CommentForm onSubmit={(content) => commentMutation.mutate(content)} />
      ) : (
        <p className="text-sm text-slate-500">Login to join the discussion.</p>
      )}
      {isLoading ? (
        <div>Loading comments…</div>
      ) : (
        <ul className="space-y-4">
          {data?.map((comment) => (
            <li key={comment._id} className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
              <div>
                <p className="font-medium text-slate-700">{comment.userId?.name ?? 'Anonymous'}</p>
                <p className="text-sm text-slate-600 mt-1">{comment.content}</p>
              </div>
              <div className="space-y-3 pl-4 border-l border-slate-100">
                {comment.replies?.map((reply) => (
                  <div key={reply._id} className="text-sm">
                    <p className="font-medium text-slate-600">{reply.userId?.name ?? 'Anonymous'}</p>
                    <p className="text-slate-500 mt-1">{reply.content}</p>
                  </div>
                ))}
                {isAuthenticated && (
                  <CommentForm
                    placeholder="Reply…"
                    onSubmit={(content) => replyMutation.mutate({ commentId: comment._id, content })}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentSection;
