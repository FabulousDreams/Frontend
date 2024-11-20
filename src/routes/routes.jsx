import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'

const AppRoutes = () => {
  return (
   
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
  
  )
}

export default AppRoutes
