import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './authContext';

const DreamContext = createContext();

export const useDreamContext = () => useContext(DreamContext);

export const DreamProvider = ({ children }) => {
  const { token } = useAuthContext(); 
  const [dreams, setDreams] = useState([]); 
  const [error, setError] = useState(null); // Handle errors

  // fetch all dreams for the loggedin user
  const fetchDreams = async () => {
    setError(null); // Reset error state
    try {
      const response = await axios.get('http://localhost:5005/dreams', {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      setDreams(response.data); 
    } catch (err) {
      setError('Failed to fetch dreams');
      console.error('Error fetching dreams:', err);
    }
  };

  
  useEffect(() => {
    if (token) {
      fetchDreams();
    }
  }, [token]);

  return (
    <DreamContext.Provider value={{ dreams, fetchDreams, error }}>
      {children}
    </DreamContext.Provider>
  );
};