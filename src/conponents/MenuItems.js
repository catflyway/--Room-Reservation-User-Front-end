import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io';

export const MenuItems = [
  {
    title: 'Calendar' ,
    path: '/',
    icon: <AiIcons.AiFillHome  size={25}/>,
    cName: 'nav-text'
  },
  {
    title: 'Room',
    path: '/Rooms',
    icon: <BiIcons.BiNews size={25}/>,
    cName: 'nav-text'
  },
  {
    title: 'Create',
    path: '/Create',
    icon: <IoIcons.IoIosCreate size={25} />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/History',
    icon: <AiIcons.AiOutlineHistory  size={25}/>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/Profiles',
    icon:  <AiIcons.AiFillSetting  size={25}/>,
    cName: 'nav-text'
  },
  
];