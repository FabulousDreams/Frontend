import React from "react";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NightsStayIcon from '@mui/icons-material/NightsStay';







export const NavbarData = [
    {
        title: "Your Dashboard",
        icon: <NightsStayIcon />,
        link: "/your-dreams",
    },
    
    {
        title: "New Dream",
        icon: <AddBoxIcon />,
        link: "/dream"
        
    },
   
    {
        title: "Logout",
        icon: <MeetingRoomIcon />,
        link: "/logout"
        
    }
]