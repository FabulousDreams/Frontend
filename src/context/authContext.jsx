import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)

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
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
