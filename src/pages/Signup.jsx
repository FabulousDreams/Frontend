import React, { useState } from 'react'
import axios from 'axios'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import InputField from '../components/common/inputField'
import DreamButton from '../components/common/button'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const signUp = () => {
    // Reset messages from previous tries
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

    axios
      .post('http://localhost:5005/auth/signup', userData)
      .then(res => {
        const { authToken } = res.data // backend sends `authToken` in response
        localStorage.setItem('authToken', authToken)
        setSuccess('Sign-up successful! You can now log in.')
      })
      .catch(error => {
        if (error.response && error.response.data.message) {
          setError(error.response.data.message) // show server-side error messages
        } else {
          setError('An unexpected error occurred.')
        }
      })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    if (name === 'username') setUserName(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    if (name === 'confirmPassword') setConfirmPassword(value)
  }
  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()

    signUp()
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-login'>
        <InputField className='inputField mediumInput' label='Username'>
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

        <InputField className='inputField mediumInput' label='Email'>
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
        <InputField className='inputField mediumInput' label='  Password'>
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

        <InputField className='inputField mediumInput' label='Confirm Password'>
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
          size='mediumButton'
          className={'primary-btn'}
          onClick={handleSubmit}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </form>
  )
}

export default SignUp
