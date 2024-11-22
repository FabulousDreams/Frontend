import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from './authContext'

const DreamContext = createContext()

export const useDreamContext = () => useContext(DreamContext)

export const DreamProvider = ({ children }) => {
  const { token } = useAuthContext()
  const [myDreams, setMyDreams] = useState([])
  const [publicDreams, setPublicDreams] = useState([])
  const [error, setError] = useState(null) // Handle errors

  // fetch user dreams
  const fetchMyDreams = async () => {
    setError(null) // Reset error state

    try {
      const { data } = await axios.get('http://localhost:5005/dreams/mine', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMyDreams(data)
    } catch (error) {
      setError('Oh no, failed to fetch your dreams!')
      console.error('Error fetching dreams:', err)
    }
  }

  // fetch public dreams

  const fetchPublicDreams = async () => {
    setError(null)

    try {
      const { data } = await axios.get('http://localhost:5005/dreams/public', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPublicDreams(data)
    } catch (error) {
      setError('Oh no, failed to fetch public dreams!')
      console.error('Error fetching dreams:', err)
    }
  }

  // create new dream

  const createDream = async dreamData => {
    setError(null)

    try {
      const { data } = await axios.post(
        'http://localhost:5005/dreams',
        dreamData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setMyDreams(prevDreams => [...prevDreams, data.dream]) // to add the new dream to "myDreams"
    } catch (err) {
      setError('Failed to create dream.')
      console.error('Error creating dream:', err)
    }
  }

  // update existing dream

  const updateDream = async (dreamId, updatedData) => {
    setError(null)

    try {
      const { data } = await axios.put(
        `http://localhost:5005/dreams/${dreamId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setMyDreams(prevDreams =>
        prevDreams.map(dream => (dream._id === dreamId ? data : dream))
      )
    } catch (err) {
      setError('Oh no, failed to update dream.')
      console.error('Error updating dream:', err)
    }
  }

  // delete a dream

  const deleteDream = async dreamId => {
    setError(null)

    try {
      await axios.delete(`http://localhost:5005/dreams/${dreamId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMyDreams(prevDreams =>
        prevDreams.filter(dream => dream._id !== dreamId)
      )
    } catch (err) {
      setError('Oh no, failed to delete dream.')
      console.error('Error deleting dream:', err)
    }
  }

  useEffect(() => {
    if (token) {
      fetchMyDreams()
      fetchPublicDreams()
    }
  }, [token])

  return (
    <DreamContext.Provider
      value={{
        myDreams,
        publicDreams,
        fetchMyDreams,
        fetchPublicDreams,
        createDream,
        updateDream,
        deleteDream,
        error
      }}
    >
      {children}
    </DreamContext.Provider>
  )
}
