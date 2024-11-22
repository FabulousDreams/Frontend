import { useEffect, useState } from 'react'
import { useDreamContext } from '../context/dreamContext'
import AddnewComment from '../components/createComment'
import CommentList from '../components/commentList'

const YourDreams = () => {
  const { myDreams, updateDream, deleteDream } = useDreamContext()
  const [dreams, setDreams] = useState([])
  const [newComments, setNewComments] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editedDream, setEditedDream] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setDreams(myDreams)
    setLoading(false)
  }, [myDreams])

  const handleNewComment = (dreamId, newComment) => {
    setNewComments(prev => ({
      ...prev,
      [dreamId]: newComment
    }))
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
      <ul>
        {dreams.map(dream => {
          return (
            <li key={dream._id}>
              {editingId === dream._id ? (
                <div>
                  <input
                    type='text'
                    name='title'
                    value={editedDream.title || ''}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name='description'
                    value={editedDream.description || ''}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{dream.title}</h3>
                  <p>{dream.description}</p>
                  <button onClick={() => handleEditClick(dream)}>Edit</button>
                  <button onClick={() => handleDelete(dream._id)}>
                    Delete
                  </button>
                </div>
              )}

              <CommentList
                dreamId={dream._id}
                newComment={newComments[dream._id]}
              />
              <AddnewComment
                dreamId={dream._id}
                onCommentAdded={newComment =>
                  handleNewComment(dream._id, newComment)
                }
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default YourDreams
