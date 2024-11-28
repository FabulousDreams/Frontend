import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from '../pages/login'
import SignUpPage from '../pages/signup'
import ProtectedRoute from './protectRoutes'
import CreateD from '../pages/createDream'
import YourDreams from '../pages/privateDreams'
import Dashboard from '../pages/dashboard'
import PublicDreams from '../pages/comunitiesDream'
import LandingPage from '../pages/landingPage'
import MyProfile from '../pages/userProfile/userProfile'
import DreamDetails from '../pages/dreamDetails'

import Analysis from '../pages/analysis'

const AppRoutes = () => {
  return (
    <div className='main-area'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />

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
          path='/dream/:dreamId'
          element={
            <ProtectedRoute>
              <DreamDetails />
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
        <Route
          path='/analysis'
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default AppRoutes
