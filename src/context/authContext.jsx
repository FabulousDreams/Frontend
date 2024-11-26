import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)
  const [feedBackLogin, setFeedBackLogin] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
  }, [token])

  const login = async form => {
    try {
      const res = await axios.post('http://localhost:5005/auth/login', form)
      const authToken = res.data.authToken
      const userData = res.data.user

      setToken(authToken)
      setUser(userData)

      localStorage.setItem('authToken', authToken)
      localStorage.setItem('user', JSON.stringify(userData))

      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    } catch (error) {
      console.error('Login failed:', error)
      setFeedBackLogin('user not found.')
    }
  }
  const signUp = async userData => {
    try {
      const res = await axios.post(
        'http://localhost:5005/auth/signup',
        userData
      )

      const authToken = res.data.authToken
      const userDataResponse = res.data.user

      setToken(authToken)
      setUser(userDataResponse)

      localStorage.setItem('authToken', authToken)
      localStorage.setItem('user', JSON.stringify(userDataResponse))

      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
      return {
        success: true,
        message: 'Sign-up successful! You can now log in.'
      }
    } catch (error) {
      console.error('Sign-up failed:', error)
      if (error.response && error.response.data.message) {
        return { success: false, message: error.response.data.message }
      } else {
        return { success: false, message: 'An unexpected error occurred.' }
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, feedBackLogin, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
