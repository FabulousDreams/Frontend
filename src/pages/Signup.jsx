import React, { useState } from 'react'
import axios from 'axios'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

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

  return (
    <div className='form-container'>
      <form
        onSubmit={e => {
          e.preventDefault()
          signUp()
        }}
      >
        <div className='form-control'>
          <label htmlFor='username'> <span className='label-content'><PersonIcon className='icon' />Username</span></label>
        
          <input            
            type='text'
            id='username'
            name='username'
            required
            placeholder='Create a username '
            value={userName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='email'><span className='label-content'><EmailIcon className='icon' />Email</span></label>
          <input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Enter a valid email'
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'><span className='label-content'><LockIcon className='icon' />Password</span></label>
          <input
            type='password'
            id='password'
            name='password'
            required
            placeholder='Create a password'
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='confirmPassword'><span className='label-content'><LockIcon className='icon' />Confirm Password</span></label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            required
            placeholder='Repeat created password'
            value={confirmPassword}
            onChange={handleInputChange}
          />
        </div>


        <button type='submit'>Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  )
}

export default SignUp
