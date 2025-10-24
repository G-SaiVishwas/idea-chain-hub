import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient.js';
import { useIdeaContext } from '../context/IdeaContext.jsx';

const fetchIdeas = async ({ queryKey }) => {
  const [_key, { filters }] = queryKey;
  const params = new URLSearchParams();

  if (filters.sort && filters.sort !== 'latest') params.append('sort', filters.sort);
  if (filters.stage && filters.stage !== 'all') params.append('stage', filters.stage);
  if (filters.tags && filters.tags.length) params.append('tags', filters.tags.join(','));

  const { data } = await apiClient.get(`/ideas?${params.toString()}`);
  return data;
};

const useIdeas = () => {
  const { filters } = useIdeaContext();
  const query = useQuery({ queryKey: ['ideas', { filters }], queryFn: fetchIdeas });
  return { ...query, filters };
};

export default useIdeas;
