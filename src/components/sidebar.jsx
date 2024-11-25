import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  //   useEffect(() => {
  //     const publicRoutes = ['/', '/login', '/signup']
  //     setAuth(!publicRoutes.includes(location.pathname))
  //   }, [location.pathname, setAuth])

  // Toggle sidebar visibility for mobile
  //   const toggleSidebar = () => setOpenSidebar(!openSidebar)

  return (
    <>
      <div className='re-nav'>
        <button className='sidebar-toggle-btn'>
          {/* <img src={wlogo} className='logo-image' alt='Logo' /> */}
        </button>
      </div>
      <div className='sidebar  open closed'>
        <ul className='sidebar-list'>
          <li className='menu-item'>
            <Link to='/'>
              <span>Home</span>
            </Link>
          </li>

          <h3>Recipes</h3>
          <li className='menu-item'>
            <span>Add A Recipe</span>
          </li>
          <li className='menu-item'>
            <Link to='/my-recipes'>
              <span>My Recipes</span>
            </Link>
          </li>
          <li className='menu-item'>
            <span>Lucky Choice!</span>
          </li>
          <li className='menu-item'>
            <Link to='/tags'>
              <span>Tags</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/favourites'>
              <span>Favourites</span>
            </Link>
          </li>

          <h3>Plan & Shop</h3>
          <li className='menu-item'>
            <Link to='/meal-planner'>
              <span>Meal Planner</span>
            </Link>
          </li>
          <li className='menu-item responsive'>
            <Link to='/shopping-lists'>
              <span>Shopping Lists</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
