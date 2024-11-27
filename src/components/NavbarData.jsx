import Person2Icon from '@mui/icons-material/Person2';


export const NavbarData = [
  {
    title: 'User Profile',
    icon: <Person2Icon />,
    link: '/profile',
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
