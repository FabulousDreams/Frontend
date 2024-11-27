import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';
import { Card, Avatar, CircularProgress, Button, TextField } from '@mui/material';

const Profile = () => {
  const { user, fetchUserProfile } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', profileImageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  console.log('Stored Token:', localStorage.getItem('token'));

  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        username: user.username || '',
        profileImageUrl: user.profileImageUrl || 'https://via.placeholder.com/150',
      });
    }
  }, [user, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.put(
        '/api/profile',
        { username: formData.username, profileImageUrl: formData.profileImageUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setIsEditing(false);
      await fetchUserProfile(); // refresh user data after saving
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar
            src={formData.profileImageUrl}
            className="profile-avatar"
            alt="Profile Avatar"
          />
          {isEditing ? (
            <>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Profile Image URL"
                name="profileImageUrl"
                value={formData.profileImageUrl}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              {error && <div className="profile-error">{error}</div>}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <div className="profile-username">{user.username || 'Unnamed User'}</div>
              <div className="profile-email">{user.email || 'No email provided'}</div>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className="profile-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
