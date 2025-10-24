import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forkIdea } from '../services/ideaService.js';
import useAuth from '../hooks/useAuth.js';

const ForkButton = ({ ideaId }) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => forkIdea(ideaId, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idea', ideaId] });
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    }
  });

  return (
    <button
      type="button"
      disabled={!isAuthenticated || isPending}
      onClick={() => mutate()}
      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-slate-300"
    >
      {isPending ? 'Forking…' : 'Fork This Idea'}
    </button>
  );
};

export default ForkButton;
