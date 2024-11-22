import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import axios from 'axios'

const DreamDetails = () => {
  const { dreamId } = useParams() // Get dreamId from URL
  const [dream, setDream] = useState(null)
  const [comments, setComments] = useState([])

  // Fetch dream details
  useEffect(() => {
    const fetchDream = async () => {
      try {
        const response = await axios.get(`/api/dreams/${dreamId}`)
        setDream(response.data)
      } catch (error) {
        console.error('Error fetching dream:', error)
      }
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/dream/${dreamId}`)
        setComments(response.data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchDream()
    fetchComments()
  }, [dreamId])

  // Handle adding a new comment
  const addComment = newComment => {
    setComments(prev => [...prev, newComment])
  }

  return (
    <div>
      {dream ? (
        <>
          <h1>{dream.title}</h1>
          <p>{dream.description}</p>
          <h3>Comments</h3>
          <CommentList comments={comments} />
          <CommentForm dreamId={dreamId} onAddComment={addComment} />
        </>
      ) : (
        <p>Loading dream details...</p>
      )}
    </div>
  )
}

export default DreamDetails
