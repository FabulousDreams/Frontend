import React, { useEffect } from 'react'
import { useUserContext } from '../../context/userContext'

const Profile = () => {
  const { user, fetchUserProfile } = useUserContext()

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Profile
