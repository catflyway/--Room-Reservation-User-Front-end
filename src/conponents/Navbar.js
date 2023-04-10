import React, { useContext} from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Menu } from "antd";
import {MenuItems} from './MenuItems'
import { UserContext } from "../user-context"
import './Navbar.css';

const Navbar = () => {
    let user = useContext(UserContext);
    let location = useLocation();

    return (
        <Menu
          // theme="dark"
          mode="horizontal"
          style={{ justifyContent: "center" }}
          defaultSelectedKeys={[location.pathname]}
          items={MenuItems.map((item, _) => {
            if (!item.role.includes(user.role)) {
              return undefined;
            }
            return {
              key: item.path,
              label: <Link to={item.path}>{item.title}</Link>,
              icon: item.icon,
            };
          })}
        />
      );

// class Navbar extends Component{
//     state={clicked:false}

//     handleClick = () =>{
//         this.setState({clicked:!this.state.clicked})
//     }

//     Logout =() =>{
//         <LoginForm/>
//     }

//     render(){
//         return(
//             <nav className='NavbarItems'>
//                 <ul className={this.state.clicked? 'nav-menu active':'nav-menu'}>
//                     {MenuItems.map((item,index)=>{
//                         return(
//                             <li key={index} className={item.cName}>
//                                 <Link to={item.path}>
//                                 <span>{item.icon} <br/>
//                                     {item.title}</span>
//                                 </Link>
//                             </li>
//                         )
//                     })}
//                 </ul>
//               { /* <div  className='nav-log'>
//                 <div className='nav-logout'>
//                <FaIcons.FaUserCog size={25}/>
//                 <p>Logout</p>
//                 </div>
//                 </div> */}
//             </nav>

//         )
//     }
}

export default Navbar;
