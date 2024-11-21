import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/signup'

const AppRoutes = () => {
  return (

    
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    

  )
}

export default AppRoutes
