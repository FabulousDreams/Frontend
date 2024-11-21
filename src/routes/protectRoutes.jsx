import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext()
  return user ? children : <Navigate to='/' />
}

export default ProtectedRoute
