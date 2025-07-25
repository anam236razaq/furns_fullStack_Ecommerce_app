import React, { useState } from 'react'
import { FiAlignJustify, FiMail, FiMaximize } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaBolt, FaCog, FaRegUser, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { MdNotifications, MdOutlineChevronRight, MdOutlineDesktopWindows, MdOutlineSettings } from 'react-icons/md';
import { IoCart, IoCodeSlash, IoPricetag } from 'react-icons/io5';
import { RxCube } from 'react-icons/rx';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { LuShoppingCart, LuUsers } from 'react-icons/lu';
import { IoMdStats } from 'react-icons/io';

const messages = [
  {
    "id": "1",
    "name": "John Deo",
    "img": "/src/assets/users/user-1.png",
    "text": "Is this item in stock?",
    "time": "2 Min Ago"
  },
  {
    "id": "2",
    "name": "Sarah Smith",
    "img": "/src/assets/users/user-2.png",
    "text": "Delivery date for order #67890.",
    "time": "5 Min Ago"
  },
  {
    "id": "3",
    "name": "Jacob Ryan",
    "img": "/src/assets/users/user-3.png",
    "text": "Bulk discount for 10 units?",
    "time": "2 Min Ago"
  },
  {
    "id": "4",
    "name": "Lina Smith",
    "img": "/src/assets/users/user-4.png",
    "text": "Received a defective item.",
    "time": "2 Min Ago"
  },
  {
    "id": "5",
    "name": "Jalpa Joshi",
    "img": "/src/assets/users/user-1.png",
    "text": "Details about product warranty?",
    "time": "2 Min Ago"
  },
];

const notifications = [
  {
    id: "1",
    icon: <IoCodeSlash className="icon-admin" />,
    text: "New code for checkout.",
    time: "2 Min Ago",
  },
  {
    id: "2",
    icon: <IoCart className="icon-admin" />,
    text: "Cart updated with promotions.",
    time: "5 Min Ago",
  },
  {
    id: "3",
    icon: <IoPricetag className="icon-admin" />,
    text: "Flash sale: 20% off electronics!",
    time: "10 Min Ago",
  },
];

export default function AdminBars() {
  const[isSidebarVisible, setIsSidebarVisible] = useState(false);
  const[isMessageVisible, setIsMessageVisible] = useState(false);
  const[isNotificationVisible, setIsNotificationVisible] = useState(false);
  const[isUserProfile, setIsUserProfile] = useState(false);

  function toggleMessageDropdown(){
    setIsMessageVisible(!isMessageVisible);
    setIsNotificationVisible(false);
    setIsUserProfile(false);
  }

  function toggleNotificationDropdown(){
    setIsNotificationVisible(!isNotificationVisible);
    setIsMessageVisible(false);
    setIsUserProfile(false);
  }

  function toggleUserProfile(){
    setIsUserProfile(!isUserProfile);
    setIsMessageVisible(false);
    setIsNotificationVisible(false);
  }

  function maximizeWindow(){
    if(!document.fullscreenElement){
      if(document.documentElement.requestFullscreen){
        document.documentElement.requestFullscreen();
      }else if(document.documentElement.webkitRequestFullscreen){
        document.documentElement.webkitRequestFullscreen();
      }
    }else{
      if(document.exitFullscreen){
        document.exitFullscreen();
      }else if(document.webkitExitRequestscreen){
        document.webkitExitRequestscreen();
      }
    }
  }

  return (
        <>
        <nav className="navbar navbar-expand-lg sticky">
          <div className="form-inline" style={{marginRight: 'auto'}}>
            <ul className='navbar-nav' style={{marginRight: '1rem'}}>
              <li><button className="nav-link nav-link-lg menu-icon">
                    <FiAlignJustify className='icon-admin' onClick={()=>setIsSidebarVisible(!isSidebarVisible)}/></button></li>
              <li><button onClick={maximizeWindow} className='nav-link nav-link-lg'><FiMaximize className='icon-admin'/></button></li>
              <li>
                <form className='form-inline mr-auto'>
                  <div className='search-element'>
                    <input className='form-control' type='search' placeholder='Search' aria-label='Search' data-width='200' />
                    <button className='btn' type='submit'><FaSearch className='icon-admin'/></button>
                  </div>
                </form>
              </li>
            </ul>
        </div>
        <ul className='navbar-nav'>
          <li className='admin-dropdown dropdown-list-toggle'>
            <button onClick={toggleMessageDropdown} className='nav-link nav-link-lg message-toggle' data-toggle='dropdown'>
              <FiMail className='icon-admin'/>
              <span className="badge headerBadge1">5</span>
            </button>
            {isMessageVisible && <div className='admin-dropdown-menu dropdown-menu-1-right pullDown'>
              <div className='dropdown-header'>
                  Messages
                  <div className='float-right'><Link to="" className='dropdown-links'>Mark All As Read</Link></div>
              </div>
              <div className='dropdown-list-content dropdown-list-message'>
                {messages.map((message)=> (
                  <Link to="/" className='dropdown-item' key={message.id}>
                  <span className='dropdown-item-avatar text-white'>
                    <img src={message.img} alt='Image' style={{borderRadius: '50%'}}/>
                  </span>
                  <span className='dropdown-item-desc'>
                    <span style={{fontWeight: '500'}}>{message.name}</span>
                    <span  style={{fontSize: '14px'}}>{message.text}</span>
                    <span style={{fontSize: '12px', color: 'gray'}}>{message.time}</span>
                  </span>
                </Link>
                ))}
              </div>
              <div className='text-center'>
                  <Link to="" className='dropdown-links'>View All<MdOutlineChevronRight /></Link>
              </div>
            </div>
            }
          </li>
          <li className='admin-dropdown dropdown-list-toggle'>
            <button className='nav-link nav-link-lg' onClick={toggleNotificationDropdown}>
              <MdNotifications className="icon-admin bell"/>
            </button>
            {isNotificationVisible && <div className='admin-dropdown-menu dropdown-menu-2-right pullDown'>
              <div className='dropdown-header'>
                  Notifications
                  <div className='float-right'><Link to="" className='dropdown-links'>Mark All As Read</Link></div>
              </div>
              <div className='dropdown-list-content dropdown-list-icons'>
                {notifications.map((item)=> (
                  <Link to="/" className='dropdown-item dropdown-item-unread' key={item.id}>
                  <div className='dropdown-item-icon text-white' style={{backgroundColor: '#fd7e14'}}>
                    <span className=''>{item.icon}</span>
                  </div>
                  <span className='dropdown-item-desc'>
                    <span style={{fontSize: '14px'}}>{item.text}</span>
                    <span style={{fontSize: '14px'}}>{item.message}</span>
                    <span  style={{fontSize: '12px', color: 'gray'}}>{item.time}</span>
                  </span>
                </Link>
                ))}
              </div>
              <div className='text-center'>
                  <Link to="" className='dropdown-links'>View All<MdOutlineChevronRight/></Link>
              </div>
            </div>
            }
          </li>
          <li className="user-dropdown">
            <button onClick={toggleUserProfile} className="nav-link nav-link-user"> 
              <img alt="image" src="/src/assets/users/user-1.png" className="user-img-radious-style" /> 
            </button>
            {isUserProfile && <div className="user-dropdown-menu dropdown-menu-3-right pullDown">
              <div className="ms-4 mb-2 text-uppercase" style={{fontWeight: '500', fontSize: '14px'}}>
                Hello Sarah Smith
              </div>
              <Link to="" className="user-dropdown-item ps-4"><FaRegUser className='me-2'/>Profile</Link> 
              <Link to="" className="user-dropdown-item ps-4"><FaBolt className='me-2'/>Activities</Link> 
              <Link to="" className="user-dropdown-item ps-4"> <FaCog className='me-2'/>Settings</Link>
              <div className="dropdown-divider"></div>
              <Link to="" className="user-dropdown-item text-danger ps-4"><FaSignOutAlt className='me-2'/>Logout</Link>
            </div>
            }
          </li>
        </ul>
      </nav>
      {isSidebarVisible && <div className='overlay' onClick={()=>setIsSidebarVisible(false)}/>}
      <div className={`main-sidebar sidebar-style-2 ${isSidebarVisible? 'show' : ''}`}>
        <aside >
          <div className='sidebar-brand'>
            <Link to='/'><img src='/src/assets/logo.png' alt='Furns' className='header-logo'/></Link>
          </div>
          <ul className='sidebar-menu'>
                <li className='mt-3'>
                  <Link className='nav-link' to="/dashboard">
                    <MdOutlineDesktopWindows className='fs-5'/>
                    <span className='ms-2'>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to="/products">
                    <RxCube className='fs-5'/>
                    <span className='ms-2'>Products</span>
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to="/flash-sales">
                    <AiOutlineThunderbolt className='fs-5'/>
                    <span className='ms-2'>Flash Sales</span>
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to="/customers">
                    <LuUsers className='fs-5'/>
                    <span className='ms-2'>Customers</span>
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to="/order-list">
                    <LuShoppingCart className='fs-5'/>
                    <span className='ms-2'>Order List</span>
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to="/report">
                    <IoMdStats className='fs-5'/>
                    <span className='ms-2'>Report</span>
                  </Link>
                </li>
                <li>
                  <Link className='nav-link' to="/settings">
                    <MdOutlineSettings className='fs-5'/>
                    <span className='ms-2'>Settings</span>
                  </Link>
                </li>
            </ul>
        </aside>
      </div>
    </>
  )
}
