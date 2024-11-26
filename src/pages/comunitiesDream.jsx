import { useState, useEffect } from 'react'

import Card from '../components/CardComponent'
import { useDreamContext } from '../context/dreamContext'
const PublicDreams = () => {
  const { myDreams, updateDream, deleteDream, tags, emotions } =
    useDreamContext()
  const { publicDreams } = useDreamContext()

  const [dreams, setDreams] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setDreams(publicDreams)
    setLoading(false)
  }, [publicDreams])
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
  if (loading) {
    return <p>Loading dreams...</p>
  }

  if (dreams.length === 0) {
    return <p>No dreams found, start adding some!</p>
  }

  return (
    <div>
      <h1>public Dreams</h1>

      {dreams.map(dream => {
        const emotionNames = getEmotionNames(dream.emotions || [])
        const tagNames = getTagNames(dream.tags || [])

        return (
          <div key={dream._id}>
            <Card
              id={dream._id}
              title={dream.title}
              subtitle={dream.subtitle}
              description={dream.description}
              emotions={emotionNames}
              tags={tagNames}
              imageUrl={dream.imageUrl}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PublicDreams
