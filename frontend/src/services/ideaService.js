import apiClient from './apiClient.js';

export const createIdea = async (payload) => {
  const { data } = await apiClient.post('/ideas', payload);
  return data;
};

export const updateIdea = async (id, payload) => {
  const { data } = await apiClient.patch(`/ideas/${id}`, payload);
  return data;
};

export const deleteIdea = async (id) => {
  await apiClient.delete(`/ideas/${id}`);
};

export const forkIdea = async (id, payload) => {
  const { data } = await apiClient.post(`/ideas/${id}/fork`, payload);
  return data;
};

export const fetchIdeaRating = async (ideaId) => {
  const { data } = await apiClient.get(`/ratings/${ideaId}`);
  return data;
};

export const rateIdea = async (payload) => {
  const { data } = await apiClient.post('/ratings', payload);
  return data;
};
