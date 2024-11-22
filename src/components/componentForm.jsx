import React, { useState } from 'react'
import axios from 'axios'

const CommentForm = ({ dreamId, onAddComment }) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/comments', { dreamId, text })
      onAddComment(response.data) // Update parent state with new comment
      setText('') // Clear input field
    } catch (error) {
      setError('Failed to add comment')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='Write a comment...'
        required
      ></textarea>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type='submit'>Add Comment</button>
    </form>
  )
}

export default CommentForm
