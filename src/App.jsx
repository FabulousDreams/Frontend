import { useEffect, useState } from 'react'
import axios from 'axios'
import AppRoutes from './routes/routes'
function App () {
  const [token, setToken] = useState(null)
  const login = () => {
    const userData = {
      email: 'admin2@gmail.com',
      username: 'Mari',
      password: 'I654321Ma'
    }
    axios
      .post('http://localhost:5005/auth/login', userData)
      .then(res => {
        const authToken = res.data.authToken
        setToken(authToken)
        localStorage.setItem('authToken', authToken)
      })

      .catch(e => {
        console.log(e)
      })
  }
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])
  return (
    <>
      <AppRoutes />
      <button onClick={login}>Login</button>
    </>
  )
}

export default App
