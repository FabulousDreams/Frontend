import React from 'react'

const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map(comment => (
        <li key={comment._id}>
          <p>
            <strong>{comment.userId.username}</strong>: {comment.text}
          </p>
          <small>{new Date(comment.date).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
