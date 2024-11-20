import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import DreamLog from './pages/dreamLog'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dream-log' element={<DreamLog />} />
    </Routes>
  </Router>
)

export default AppRoutes
