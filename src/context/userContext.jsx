import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './authContext'
// Create the UserContext
const UserContext = createContext()

// Custom hook for easier access to context
export const useUserContext = () => useContext(UserContext)

// Provider Component
export const UserProvider = ({ children }) => {
  const { token } = useAuthContext()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch user profile from the backend
  const fetchUserProfile = async () => {
    setError(null)
    try {
      const { data } = await axios.get('http://localhost:5005/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(data)
      console.log(data)
    } catch (err) {
      setError('Oh no, failed to fetch your data!')
      console.error('Error fetching data:', err)
    }
  }

  // Update user profile
  const updateUserProfile = async updatedData => {
    setLoading(true)
    try {
      const response = await axios.put(
        'http://localhost:5005/api/profile',
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setUser(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  // Fetch all users (admin-only)
  const fetchAllUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'http://localhost:5005/api/admin/users',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching users')
      return []
    } finally {
      setLoading(false)
    }
  }

  // Delete a user (admin-only)
  const deleteUser = async userId => {
    setLoading(true)
    try {
      await axios.delete(`http://localhost:5005/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting user')
      return false
    } finally {
      setLoading(false)
    }
  }

  // Provide state and functions
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        fetchUserProfile,
        updateUserProfile,
        fetchAllUsers,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
