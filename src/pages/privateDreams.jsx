import { useEffect, useState } from 'react'
import { useDreamContext } from '../context/dreamContext'
import Card from '../components/CardComponent'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'



const YourDreams = () => {
  const { myDreams, updateDream, deleteDream, tags, emotions } =
    useDreamContext()

  const [dreams, setDreams] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedDream, setEditedDream] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setDreams(myDreams)
    setLoading(false)
  }, [myDreams])

  const handleSearch = (query) => {
    const filteredDreams = myDreams.filter((dream) =>
      dream.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDreams(filteredDreams);
  };



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
  const handleDelete = async dreamId => {
    await deleteDream(dreamId)
  }
  const handleSaveClick = async () => {
    await updateDream(editingId, editedDream)
    setEditingId(null)
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
      <SearchBar onSearch={handleSearch} />

      {dreams.map(dream => {
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
