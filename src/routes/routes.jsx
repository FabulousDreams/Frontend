import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import Login from '../pages/Login'
import SignUp from '../pages/signup'
import ProtectedRoute from './protectRoutes'
import CreateD from '../pages/createDream'
import YourDreams from '../pages/displayDreams'
import Dashboard from '../pages/dashboard'
import PublicDreams from '../pages/comunitiesDream'
import LandingPage from '../pages/landingPage'
import MyProfile from '../pages/userProfile/userProfile'

const AppRoutes = () => {
  return (
    <div className='main-area'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/add-dream'
          element={
            <ProtectedRoute>
              <CreateD />
            </ProtectedRoute>
          }
        />

        <Route
          path='/mine-dreams'
          element={
            <ProtectedRoute>
              <YourDreams />
            </ProtectedRoute>
          }
        />
        <Route
          path='/public-dreams'
          element={
            <ProtectedRoute>
              <PublicDreams />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default AppRoutes
