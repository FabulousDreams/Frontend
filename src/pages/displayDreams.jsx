import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDreamContext } from '../context/dreamContext'
const YourDreams = () => {
  const { myDreams } = useDreamContext()
  console.log('myDreams', myDreams)
  const [dreams, setDreams] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setDreams(myDreams)
    setLoading(false)
  }, [myDreams])

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
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default YourDreams
