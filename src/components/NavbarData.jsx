import NightsStayIcon from '@mui/icons-material/NightsStay'
import AddBoxIcon from '@mui/icons-material/AddBox'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'

export const NavbarData = [
  {
    title: 'Your Dashboard',
    icon: <NightsStayIcon />,
    link: '/dashboard',
    protected: true
  },
  {
    title: 'Your Dreams',
    icon: <AddBoxIcon />,
    link: '/mine-dreams',
    protected: true
  },
  {
    title: 'New Dream',
    icon: <AddBoxIcon />,
    link: '/add-dream',
    protected: true
  },
  {
    title: 'Logout',
    icon: <MeetingRoomIcon />,
    link: '/logout',
    protected: true
  },
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
