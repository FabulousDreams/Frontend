import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import Sidebar from '../components/sidebar'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext()
  return token ? (
    <div className={`main-content ${token ? '' : 'no-sidebar'}`}>
      <Sidebar /> {children}
    </div>
  ) : (
    <Navigate to='/' />
  )
}

export default ProtectedRoute
