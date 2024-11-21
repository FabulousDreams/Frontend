import React, { createContext, useContext, useState } from 'react'

// Create the AuthContext
const AuthContext = createContext()

// Hook to access the AuthContext
export const useAuthContext = () => useContext(AuthContext)

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // User state

  // Functions to manage auth state
  const login = userData => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
