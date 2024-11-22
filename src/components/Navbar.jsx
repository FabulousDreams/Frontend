import '../app.css'
import { NavbarData } from './NavbarData'
import { useAuthContext } from '../context/authContext'

function Navbar () {
  const { user, logout } = useAuthContext()

  const filteredNavbarData = NavbarData.filter(item => {
    if (user) {
      return item.title !== 'Sign Up' && item.title !== 'Login'
    } else {
      return item.title !== 'Logout' && !item.protected
    }
  })

  return (
    <nav>
      <h1>DreamCatcher</h1>
      <ul className='navbar-links'>
        {filteredNavbarData.map((item, index) => (
          <li key={index} className='navbar-item'>
            {item.link === '/logout' ? (
              <button onClick={logout} className='navbar-link'>
                {item.icon}
                <span>{item.title}</span>
              </button>
            ) : (
              <a href={item.link} className='navbar-link'>
                {item.icon}
                <span>{item.title}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
