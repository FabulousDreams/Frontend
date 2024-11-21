import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {
  const [token, setToken] = useState(null)
  const [userName, setUserName] = useState('Mari')
  const [email, setEmail] = useState('admin2@gmail.com')
  const [password, setPassword] = useState('I654321Ma')

  const login = () => {
    const userData = {
      email: email,
      username: userName,
      password: password
    }
      
    axios
      .post('http://localhost:5005/auth/login', userData)
      .then(res => {
        console.log(res.data)
        const authToken = res.data.authToken
        const userId = res.data.user._id;
        setToken(authToken)
        localStorage.setItem('authToken', authToken)
      })
      .catch(error => {
        console.error('Login failed:', error)
      })
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target
    if (name === 'username') setUserName(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
          login()
        }}
      >
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            required
            value={userName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Login
