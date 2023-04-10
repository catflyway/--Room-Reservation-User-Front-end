import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io';

import Home from "../pages/Home";
import Room from "../pages/Room";
import Create from "../pages/Create";
import History from "../pages/History/History";
import Profile from "../pages/Profile";


export const MenuItems = [
  {
    title: 'Calendar' ,
    path: '/',
    icon: <AiIcons.AiFillHome  size={20}/>,
    element: <Home/>,
    role:["Room Contributor","User"]
  },
  {
    title: 'Room',
    path: '/Rooms',
    icon: <BiIcons.BiNews size={20}/>,
    element: <Room/>,
    role:["Room Contributor","User"]
  },
  {
    title: 'Create',
    path: '/Create',
    icon: <IoIcons.IoIosCreate size={20} />,
    element: <Create/>,
    role:["Room Contributor","User"]
  },
  {
    title: 'History',
    path: '/History',
    icon: <AiIcons.AiOutlineHistory  size={20}/>,
    element: <History/>,
    role:["Room Contributor","User"]
  },
  {
    title: 'Profile',
    path: '/Profiles',
    icon:  <AiIcons.AiFillSetting  size={20}/>,
    element: <Profile/>,
    role:["Room Contributor","User"]
  },

];
