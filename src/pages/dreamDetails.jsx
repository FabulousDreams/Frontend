import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddnewComment from '../components/createComment'
import CommentList from '../components/commentList'
import { useDreamContext } from '../context/dreamContext'
import Card from '../components/CardComponent'

const DreamDetails = () => {
  const { dreamId } = useParams()
  const {
    myDreams,
    updateDream,
    deleteDream,
    tags,
    emotions,
    fetchDreamById,
    specificDream,
    error
  } = useDreamContext()

  const [newComments, setNewComments] = useState({})

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
  const getEmotionNames = emotionIds => {
    return emotionIds.map(id => {
      const emotion = emotions.find(emotion => emotion._id === id)
      return emotion ? emotion.name : 'Unknown Emotion'
    })
  }

  const getTagNames = tagIds => {
    return tagIds.map(id => {
      const tag = tags.find(tag => tag._id === id)
      return tag ? tag.name : 'Unknown Tag'
    })
  }

  if (error) return <p>{error}</p>
  if (!specificDream) return <p>Loading...</p>

  const emotionNames = getEmotionNames(specificDream.emotions || [])
  const tagNames = getTagNames(specificDream.tags || [])
  return (
    <div>
      {specificDream ? (
        <>
          <Card
            id={specificDream._id}
            title={specificDream.title}
            subtitle={specificDream.subtitle}
            description={specificDream.description}
            emotions={emotionNames}
            tags={tagNames}
            imageUrl={specificDream.imageUrl}
            // onEditItem={() => handleEditClick(dream)}
            // onDeleteItem={handleDelete}
          />

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
