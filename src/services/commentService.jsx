import axios from 'axios'

const API_URL = 'http://localhost:5005/api/comments'

// Fetch all comments for a specific dream
export const fetchComments = async dreamId => {
  const response = await axios.get(`${API_URL}/dream/${dreamId}`)
  return response.data
}

// Create a new comment
export const addComment = async (dreamId, text) => {
  console.log(dreamId)
  const response = await axios.post(API_URL, { dreamId, text })
  return response.data
}

// Update a comment by ID
export const updateComment = async (commentId, text) => {
  const response = await axios.put(`${API_URL}/${commentId}`, { text })
  return response.data
}

// Delete a comment by ID
export const deleteComment = async commentId => {
  await axios.delete(`${API_URL}/${commentId}`)
}
