import apiClient from './apiClient.js';

export const analyzeIdea = async (payload) => {
  const { data } = await apiClient.post('/ai/analyze', payload);
  return data.feedback;
};

export const fetchTrends = async () => {
  const { data } = await apiClient.get('/ai/trends');
  return data;
};
