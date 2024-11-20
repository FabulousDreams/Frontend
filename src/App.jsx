import { useEffect, useState } from 'react'
import axios from 'axios'

function App () {
  const [token, setToken] = useState(null)
  const login = () => {
    const userData = {
      email: 'admin@gmail.com',
      username: 'Mona',
      password: 'I123456Ma'
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
      <button onClick={login}>Login</button>
    </>
  )
}

export default App
