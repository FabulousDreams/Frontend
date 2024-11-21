import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import SignUp from '../pages/signup'

import Dashboard from '../pages/dashboard'
import DreamCreation from '../pages/createDream'
import ProtectedRoute from './protectRoutes'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
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
    </Routes>

  )
}

export default AppRoutes
