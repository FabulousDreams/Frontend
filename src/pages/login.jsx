import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import tent from '../assets/images/tent.jpg'
import SignUp from '../pages/signup'

const Login = () => {
  const { login, feedBackLogin } = useAuthContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: 'admin@gmail.com',
    password: 'I123456Ma'
  })
  const [active, setActive] = useState(true)
  const Signup = () => {
    setActive(!active)
  }
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
    <div id='login-form'>
      <form onSubmit={handleSubmit}>
        {active ? (
          <div className='input-login'>
            <h3>Login</h3>
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
            <button onClick={Signup}>have you not register?</button>
            <p>{feedBackLogin}</p>
          </div>
        ) : (
          <SignUp />
        )}
        <div className='image-firm'>
          <img src={tent} alt='tent' />
        </div>
      </form>
    </div>
  )
}

export default Login
