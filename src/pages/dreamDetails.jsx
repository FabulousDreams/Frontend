import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddnewComment from '../components/createComment'
import CommentList from '../components/commentList'
import { useDreamContext } from '../context/dreamContext'

const DreamDetails = () => {
  const { dreamId } = useParams()

  const { fetchDreamById, specificDream, error } = useDreamContext()

  const [newComments, setNewComments] = useState({})
  // Fetch dream details

  const handleNewComment = (dreamId, newComment) => {
    setNewComments(prev => ({
      ...prev,
      [dreamId]: newComment
    }))
  }

  useEffect(() => {
    if (dreamId) {
      fetchDreamById(dreamId)
    }
  }, [])
  if (error) return <p>{error}</p>
  if (!specificDream) return <p>Loading...</p>

  return (
    <div>
      {specificDream ? (
        <>
          <h1>{specificDream.title}</h1>
          <p>{specificDream.description}</p>
          <h3>Comments</h3>
          <CommentList
            dreamId={specificDream._id}
            newComment={newComments[specificDream._id]}
          />
          <AddnewComment
            dreamId={specificDream._id}
            onCommentAdded={newComment =>
              handleNewComment(specificDream._id, newComment)
            }
          />
        </>
      ) : (
        <p>Loading dream details...</p>
      )}
    </div>
  )
}

export default DreamDetails
