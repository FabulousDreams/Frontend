import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext()
  return token ? children : <Navigate to='/' />
}

export default ProtectedRoute
