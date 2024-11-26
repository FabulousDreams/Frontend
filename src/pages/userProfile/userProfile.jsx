import React, { useEffect } from 'react';
import { useUserContext } from '../../context/userContext';
import { Card, Avatar, CircularProgress, Box, Button } from '@mui/material';

const Profile = () => {
  const { user, fetchUserProfile } = useUserContext();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Box className="profile-container">
      <Card className="profile-card">
        <Box className="profile-header">

          <Avatar
            src={user?.profilePicture || 'https://via.placeholder.com/150'}
            className="profile-avatar"
          />
          <div className="profile-username">
            {user ? user.username : 'Loading...'}
          </div>
          <div className="profile-email">
            {user ? user.email : 'Loading...'}
          </div>

          {user && (
            <Box className="profile-stats">
              <Box className="profile-stat">
                <div className="profile-stat-label">
                  Public Dreams:
                </div>
                <div className="profile-stat-value">{user.postsCount}</div>
              </Box>
            </Box>
          )}

          <Button variant="outlined" color="primary" fullWidth className="profile-button">
            Edit Profile
          </Button>

        </Box>
      </Card>
    </Box>
  );
};

export default Profile;
