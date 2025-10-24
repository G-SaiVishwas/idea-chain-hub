import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient.js';

const fetchIdea = async ({ queryKey }) => {
  const [_key, ideaId] = queryKey;
  if (!ideaId) return null;
  const { data } = await apiClient.get(`/ideas/${ideaId}`);
  return data;
};

const useIdeaDetail = (ideaId) => {
  return useQuery({
    queryKey: ['idea', ideaId],
    queryFn: fetchIdea,
    enabled: Boolean(ideaId)
  });
};

export default useIdeaDetail;
