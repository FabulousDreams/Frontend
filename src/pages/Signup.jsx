import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/authContext'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import InputField from '../components/common/inputField'
import DreamButton from '../components/common/button'

import tent from '../assets/images/Starry_night_Van_Gogh_detail_hills.jpg'

const SignUp = () => {
  const { signUp } = useAuthContext()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [active, setActive] = useState(true)
  const Login = () => {
    setActive(!active)
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    if (name === 'username') setUserName(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
  }

  const handleSubmit = async e => {
    setError(null)
    setSuccess(null)

    // see if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }
    const userData = {
      email,
      username: userName,
      password
    }
    e.preventDefault()
    await signUp(userData)
  }

  return (
    <div id='login-form'>
      <div className='form-area'>
        <form onSubmit={handleSubmit}>
          <div className='input-login'>
            <InputField className='inputField mediumInput'>
              <PersonIcon className='icon' />
              <input
                type='text'
                id='username'
                name='username'
                required
                value={userName}
                placeholder='Create a username '
                onChange={handleInputChange}
              />
            </InputField>

            <InputField className='inputField mediumInput'>
              <EmailIcon className='icon' />
              <input
                type='email'
                id='email'
                name='email'
                required
                placeholder='Enter a valid email'
                value={email}
                onChange={handleInputChange}
              />
            </InputField>
            <InputField className='inputField mediumInput'>
              <LockIcon className='icon' />
              <input
                type='password'
                id='password'
                name='password'
                required
                placeholder='Create a password'
                value={password}
                onChange={handleInputChange}
              />
            </InputField>

            <InputField className='inputField mediumInput'>
              <LockIcon className='icon' />
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                required
                placeholder='Repeat created password'
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </InputField>

            <DreamButton
              label='Sign up'
              enable={true}
              size='medium'
              className={'primary-btn'}
              onClick={handleSubmit}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <p>
              Already have account?
              <p onClick={Login} className='underline'>
                Click here
              </p>
            </p>
          </div>
        </form>
        <div className='image-firm'>
          <img src={tent} alt='tent' />
        </div>
      </div>
    </div>
  )
}

export default SignUp
