import { useEffect, useState } from 'react'
import { useDreamContext } from '../context/dreamContext'
import Card from '../components/CardComponent'
import { Link } from 'react-router-dom'
const YourDreams = () => {
  const { myDreams, tags, emotions, fetchMyDreams } = useDreamContext()

  const [selectedTags, setSelectedTags] = useState([])
  const [selectedEmotions, setSelectedEmotions] = useState([])

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      await fetchMyDreams()
      setLoading(false)
    }
    fetchData()
    console.log('My Dreams:', myDreams)
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

  const toggleTag = tagId => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    )
  }

  const toggleEmotion = emotionId => {
    setSelectedEmotions(prev =>
      prev.includes(emotionId)
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    )
  }
  const applyFilters = () => {
    const filters = {}
    if (selectedTags.length > 0) filters.tags = selectedTags.join(',')
    if (selectedEmotions.length > 0)
      filters.emotions = selectedEmotions.join(',')
    fetchMyDreams(filters)
  }
  if (loading) {
    return <p>Loading dreams...</p>
  }

  return (
    <div>
      <h1>Your Dreams</h1>
      <div>
        <h2>Filter by Tags:</h2>
        {tags.map(tag => (
          <button
            key={tag._id}
            onClick={() => toggleTag(tag._id)}
            style={{
              backgroundColor: selectedTags.includes(tag._id) ? 'blue' : 'gray'
            }}
          >
            {tag.name}
          </button>
        ))}
      </div>

      <div>
        <h2>Filter by Emotions</h2>
        {emotions.map(emotion => (
          <button
            key={emotion._id}
            onClick={() => toggleEmotion(emotion._id)}
            style={{
              backgroundColor: selectedEmotions.includes(emotion._id)
                ? 'blue'
                : 'gray'
            }}
          >
            {emotion.name}
          </button>
        ))}
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
      {myDreams.map(dream => {
        const emotionNames = getEmotionNames(dream.emotions || [])
        const tagNames = getTagNames(dream.tags || [])

        return (
          <div key={dream._id}>
            <Link to={`/dream/${dream._id}`}>
              <Card
                id={dream._id}
                title={dream.title}
                subtitle={dream.subtitle}
                description={dream.description}
                emotions={emotionNames}
                tags={tagNames}
                imageUrl={dream.imageUrl}
              />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default YourDreams
