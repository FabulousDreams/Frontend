import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import PublicIcon from '@mui/icons-material/Public'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

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
              <NightsStayIcon /> <span>Dashboard</span>
            </Link>
          </li>

          <li className='menu-item'>
            <Link to='/mine-dreams'>
              <AutoAwesomeIcon /> <span>My Dreams</span>
            </Link>
          </li>

          <li className='menu-item'>
            <Link to='/analysis'>
              <AutoGraphIcon /> <span>Analytics</span>
            </Link>
          </li>

          <li className='menu-item'>
            <Link to='/add-dream'>
              <AddBoxIcon /> <span>Add New Dream</span>
            </Link>
          </li>

          <li className='menu-item responsive'>
            <Link to='/profile'>
              <AccountCircleIcon />
              <span>My Profile</span>
            </Link>
          </li>

          <li className='menu-item'>
            <Link to='/public-dreams'>
              <PublicIcon /> <span>Public Dreams</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
