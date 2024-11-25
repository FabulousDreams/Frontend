import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import tent from '../assets/images/tent.jpg'
import SignUp from '../pages/signup'
import InputField from '../components/common/inputField'
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
      <div className='form-area'>
        {active ? (
          <form onSubmit={handleSubmit}>
            <div className='input-login'>
              <h3>Login</h3>
              <div>
                <InputField className='inputField mediumInput' label='Email'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </InputField>
              </div>
              <div>
                <InputField className='inputField mediumInput' label='Password'>
                  <input
                    type='Password'
                    id='Password'
                    name='Password'
                    required
                    value={form.password}
                    onChange={handleInputChange}
                  />
                </InputField>
              </div>
              <button type='submit'>Submit</button>
              <DreamButton
                onClick={onAdd}
                label='Add'
                enable={true}
                size='small'
                className={'primary-btn'}
              />

              <button onClick={Signup}>have you not register?</button>
              <p>{feedBackLogin}</p>
            </div>
          </form>
        ) : (
          <SignUp />
        )}
        <div className='image-firm'>
          <img src={tent} alt='tent' />
        </div>
      </div>
    </div>
  )
}

export default Login
