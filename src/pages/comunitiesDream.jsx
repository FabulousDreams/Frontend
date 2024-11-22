import { useState, useEffect } from 'react'
import AddnewComment from '../components/createComment'
import CommentList from '../components/commentList'
import { useDreamContext } from '../context/dreamContext'
const PublicDreams = () => {
  const { publicDreams } = useDreamContext()

  const [dreams, setDreams] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setDreams(publicDreams)
    setLoading(false)
  }, [publicDreams])

  if (loading) {
    return <p>Loading dreams...</p>
  }

  if (dreams.length === 0) {
    return <p>No dreams found, start adding some!</p>
  }

  return (
    <div>
      <h1>public Dreams</h1>
      <ul>
        {dreams.map(dream => {
          console.log(dream)
          return (
            <li key={dream._id}>
              <h3>{dream.title}</h3>
              <p>{dream.description}</p>
              {dream.emotions && dream.emotions.length > 0 && (
                <p>Emotions: {dream.emotions.join(', ')}</p>
              )}
              <p>{dream.isPublic ? 'Public' : 'Private'}</p>
              <CommentList dreamId={dream._id} />
              <AddnewComment
                dreamId={dream._id}
                onCommentAdded={newComment =>
                  console.log('Comment added', newComment)
                }
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PublicDreams
