import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { Avatar } from '@mui/material'


const NavbarData = [


  {
    title: 'Login',
    icon: null,
    link: '/login',
    protected: false
  },
  {
    title: 'Sign Up',
    icon: null,
    link: '/signup',
    protected: false
  }
]

function Navbar() {
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
      <div className="navbar-logo">
        <img src="src\assets\images\Logo.png" alt="DreamCatcher Logo" />
      </div>
      
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

      {user && (
        <div className="navbar-user-info">
          <Link to="/profile">
            <Avatar
              src={user.profileImageUrl || 'https://via.placeholder.com/150'}
              alt="User Avatar"
            />
          </Link>
          <span className="navbar-username">{user.username}</span>
        </div>
      )}
    </nav>
  )
}

export default Navbar
