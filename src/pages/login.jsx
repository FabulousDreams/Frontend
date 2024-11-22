import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: 'admin@gmail.com',

    password: 'I123456Ma'
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await login(form)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          required
          value={form.email}
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
          value={form.password}
          onChange={handleInputChange}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Login
