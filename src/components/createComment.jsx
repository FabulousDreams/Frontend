import { useState } from 'react'
import { addComment } from '../services/commentService'
const AddnewComment = ({ dreamId, onCommentAdded }) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newComment = await addComment(dreamId, text)
      onCommentAdded(newComment) // Pass the new comment back to the parent
      setText('')
    } catch (err) {
      setError('Failed to add comment')
      console.error('Error adding comment:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='Write your comment...'
        required
      ></textarea>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type='submit'>Add Comment</button>
    </form>
  )
}

export default AddnewComment
