import { useEffect, useState } from 'react'
import { useDreamContext } from '../context/dreamContext'
import Card from '../components/CardComponent'

const YourDreams = () => {
  const { myDreams, updateDream, deleteDream, tags, emotions } =
    useDreamContext()

  const [dreams, setDreams] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editedDream, setEditedDream] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setDreams(myDreams)
    setLoading(false)
  }, [myDreams])
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
  const handleEditClick = dream => {
    setEditingId(dream._id)
    setEditedDream(dream)
  }

  const handleSaveClick = async () => {
    await updateDream(editingId, editedDream)
    setEditingId(null)
  }

  const handleDelete = async dreamId => {
    await deleteDream(dreamId)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setEditedDream(prev => ({ ...prev, [name]: value }))
  }
  if (loading) {
    return <p>Loading dreams...</p>
  }

  return (
    <div>
      <h1>Your Dreams</h1>

      {dreams.map(dream => {
        const emotionNames = getEmotionNames(dream.emotions || [])
        const tagNames = getTagNames(dream.tags || [])

        return (
          <div key={dream._id}>
            {editingId === dream._id ? (
              <div>
                <input
                  type='text'
                  name='title'
                  value={editedDream.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name='description'
                  value={editedDream.description}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <Card
                id={dream._id}
                title={dream.title}
                subtitle={dream.subtitle}
                description={dream.description}
                emotions={emotionNames}
                tags={tagNames}
                imageUrl={dream.imageUrl}
                onEditItem={() => handleEditClick(dream)}
                onDeleteItem={handleDelete}
              />
            )}

            {/* <CommentList
                dreamId={dream._id}
                newComment={newComments[dream._id]}
              />
              <AddnewComment
                dreamId={dream._id}
                onCommentAdded={newComment =>
                  handleNewComment(dream._id, newComment)
                }
              /> */}
          </div>
        )
      })}
    </div>
  )
}

export default YourDreams