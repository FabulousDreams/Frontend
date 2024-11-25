import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  // 1-function to handle sidebar at mobile size
  // 2.having logo or image for clicking on it

  return (
    <>
      <div className='responsive-nav'>
        {/* <button className='sidebar-toggle-btn'> */}
        {/* <img src={wlogo} className='logo-image' alt='Logo' /> */}
        {/* </button> */}
      </div>
      <div className='sidebar  open closed'>
        <ul className='sidebar-list'>
          <li className='menu-item'>
            <Link to='/dashboard'>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className='menu-item'>
            <Link to='/mine-dreams'>
              <span>My All Dreams</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/public-dreams'>
              <span>Public Dreams</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/add-dream'>
              <span>New Dream</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/public-dreams'>
              <span>Publics</span>
            </Link>
          </li>

          <li className='menu-item'>
            <Link to='/public-dreams'>
              <span>Analytics</span>
            </Link>
          </li>
          <li className='menu-item responsive'>
            <Link to='/profile'>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
