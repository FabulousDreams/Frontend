import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import SignUp from '../pages/signup'
import Dreams from '../pages/displayDreams'
import Dashboard from '../pages/dashboard'
import DreamCreation from '../pages/createDream'
import ProtectedRoute from './protectRoutes'
import SimpleLandingPage from '../pages/landingPage'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<SimpleLandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/dream'
        element={
          <ProtectedRoute>
            <DreamCreation />
          </ProtectedRoute>
        }
      />
      <Route
        path='/all-dream'
        element={
          <ProtectedRoute>
            <Dreams />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
