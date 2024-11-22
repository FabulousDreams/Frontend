import React, { useState, useEffect } from 'react'
import axios from 'axios'

const YourDreams = () => {
  const [dreams, setDreams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDreams = async () => {
      try {
        const response = await axios.get('/api/dreams')
        console.log(response)
        setDreams(response.data)
      } catch (error) {
        console.error('Error getting dreams:', error)
      } finally {
        setLoading(false)
      }
    }

    getDreams()
  }, [])

  if (loading) {
    return <p>Loading dreams...</p>
  }

  if (dreams.length === 0) {
    return <p>No dreams found, start adding some!</p>
  }

  return (
    <div>
      <h1>Your Dreams</h1>
      <ul>
        {dreams.map(dream => (
          <li key={dream._id}>
            <h3>{dream.title}</h3>
            <p>{dream.description}</p>
            {dream.emotions && dream.emotions.length > 0 && (
              <p>Emotions: {dream.emotions.join(', ')}</p>
            )}
            <p>{dream.isPublic ? 'Public' : 'Private'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default YourDreams
