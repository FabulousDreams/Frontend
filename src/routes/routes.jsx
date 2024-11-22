import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/signup'
import CreateD from '../pages/createDream'
import YourDreams from '../pages/displayDreams'
import PublicDreams from '../pages/displayDreams'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/dream' element={<CreateD />} />
      <Route path='/your-dreams' element={<YourDreams />} />
      <Route path='/public-dreams' element={<PublicDreams />} />
    </Routes>
  )
}

export default AppRoutes
