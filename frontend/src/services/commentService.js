import apiClient from './apiClient.js';

export const getComments = async (ideaId) => {
  const { data } = await apiClient.get(`/comments/${ideaId}`);
  return data;
};

export const addComment = async (payload) => {
  const { data } = await apiClient.post('/comments', payload);
  return data;
};

export const replyToComment = async (commentId, payload) => {
  const { data } = await apiClient.post(`/comments/${commentId}/reply`, payload);
  return data;
};
