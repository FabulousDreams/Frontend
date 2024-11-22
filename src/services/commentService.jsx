import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000/api' })

// Fetch all comments for a specific dream
export const fetchCommentsByDream = dreamId =>
  api.get(`/comments/dream/${dreamId}`)

// Create a new comment
export const createComment = (dreamId, text) =>
  api.post('/comments', { dreamId, text })

// Update a comment
export const updateComment = (commentId, text) =>
  api.put(`/comments/${commentId}`, { text })

// Delete a comment
export const deleteComment = commentId => api.delete(`/comments/${commentId}`)
