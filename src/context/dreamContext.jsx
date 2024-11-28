import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from './authContext'

const DreamContext = createContext()

export const useDreamContext = () => useContext(DreamContext)

export const DreamProvider = ({ children }) => {
  const { token } = useAuthContext()
  const [tags, setTags] = useState([])
  const [emotions, setEmotions] = useState([])
  const [myDreams, setMyDreams] = useState([])
  const [publicDreams, setPublicDreams] = useState([])
  const [specificDream, setSpecificDream] = useState(null)
  const [error, setError] = useState(null) // Handle errors

  const uploadImage = async file => {
    if (!file) {
      throw new Error('No file selected.')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
    )

    try {
      // Temporarily remove the Authorization header
      const defaultHeaders = axios.defaults.headers.common.Authorization
      delete axios.defaults.headers.common.Authorization

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/upload`,
        formData
      )

      // Restore the Authorization header
      axios.defaults.headers.common.Authorization = defaultHeaders

      return data.secure_url
    } catch (error) {
      console.error('Image upload failed:', error)
      throw new Error('Failed to upload image.')
    }
  }

  const fetchTags = async () => {
    setError(null)
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tags`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setTags(data)
    } catch (err) {
      setError('Failed to fetch tags.')
      console.error('Error fetching tags:', err)
    }
  }
  const fetchEmotions = async () => {
    setError(null) // Reset error state
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/emotions`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setEmotions(data) // Set the emotions
    } catch (err) {
      setError('Failed to fetch emotions.')
      console.error('Error fetching emotions:', err)
    }
  }
  // fetch user dreams
  const fetchMyDreams = async (filters = {}) => {
    setError(null) // Reset error state

    try {
      const query = new URLSearchParams(filters).toString()
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dreams/mine?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log('Fetched Dreams:', data)

      setMyDreams(data)
    } catch (error) {
      setError('Oh no, failed to fetch your dreams!')
      console.error('Error fetching dreams:', error)
    }
  }

  // fetch public dreams

  const fetchPublicDreams = async (filters = {}) => {
    setError(null) // Reset error state

    try {
      // Build query string from filters
      const query = new URLSearchParams(filters).toString()
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dreams/public?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log('Fetched Public Dreams:', data) // Debugging
      setPublicDreams(data) // Update state with fetched dreams
    } catch (error) {
      setError('Oh no, failed to fetch public dreams!')
      console.error('Error fetching public dreams:', error)
    }
  }
  const fetchDreamById = async dreamId => {
    setError(null)
    setSpecificDream(null) // Reset specific dream state
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dreams/${dreamId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setSpecificDream(data)
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Dream not found.')
      } else if (err.response?.status === 403) {
        setError('Access denied.')
      } else {
        setError('Failed to fetch the dream.')
      }
      console.error('Error fetching dream:', err)
    }
  }
  // create new dream

  const createDream = async dreamData => {
    setError(null)
    console.log(dreamData)
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/dreams`,
        dreamData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setMyDreams(prevDreams => [data.dream, ...prevDreams])
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
        `${import.meta.env.VITE_API_URL}/api/dreams/${dreamId}`,
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
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/dreams/${dreamId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
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
      fetchTags()
      fetchEmotions()
    }
  }, [token])

  return (
    <DreamContext.Provider
      value={{
        myDreams,
        publicDreams,
        specificDream,
        fetchMyDreams,
        fetchPublicDreams,
        fetchDreamById,
        createDream,
        updateDream,
        deleteDream,
        tags,
        emotions,
        error,
        uploadImage
      }}
    >
      {children}
    </DreamContext.Provider>
  )
}
