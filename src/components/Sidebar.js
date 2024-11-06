import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import Header from './Header';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import PropTypes from 'prop-types';
import { imgPath } from './Constants';

const Sidebar = ({ children }) => {
  const customer_type = localStorage.getItem('customer_type');
  const customer_role = localStorage.getItem('customer_role');
  const [isOpen, setIsOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  const shouldToggleSubMenu = (menuName) => ['Master'].includes(menuName);

  const toggleSubMenuVisibility = (menuName) => {
    setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  };

  const toggleSubMenu = (menuName) => {
    if (shouldToggleSubMenu(menuName)) {
      toggleSubMenuVisibility(menuName);
    } else {
      toggleSidebarVisibility();
    }
  };

  const toggleSidebarVisibility = () => {
    setIsOpen(!isOpen);
  };

  // Define menu items conditionally based on customer_type
  const menuItem = [
    {
      id: 1,
      path: '/dashboard',
      name: 'Dashboard ',
      icon: <img src={imgPath.dashboard} alt="documents" />,
    },
    {
      id: 2,
      path: '/',
      name: 'Master',
      icon: <img src={imgPath.master} alt="master" />,
      subMenu: [
        {
          sub_id: 1,
          path: '/master/devices',
          name: 'Devices',
        },
        // Conditionally include additional items for non-project customer types
        ...(customer_type === 'property'
          ? [
              {
                sub_id: 2,
                path: '/master/district',
                name: 'District',
              },
              {
                sub_id: 3,
                path: '/master/taluk',
                name: 'Taluk',
              },
              {
                sub_id: 4,
                path: '/master/village',
                name: 'Village',
              },
            ]
          : []),
      ],
    },
    {
      id: 3,
      path: '/customers',
      name: `Customers ${customer_role}`,
      icon: <img src={imgPath.customers} alt="documents" />,
    },
    ...(customer_type === 'property'
      ? [
          {
            id: 5,
            path: '/properties',
            name: 'Property ',
            icon: <img src={imgPath.propertyRegistration} alt="documents" />,
          },
         
          {
            id: 8,
            path: '/property-geolocation',
            name: 'Property Geolocation',
            icon: <img src={imgPath.propertyRegistration} alt="documents" />,
          },
          {
            id: 10,
            path: '/device-property-geopoint',
            name: 'Device Geopoint',
            icon: <img src={imgPath.propertyRegistration} alt="documents" />,
          },
        
        ]
      : []),
    ...(customer_type === 'project'
      ? [
          {
            id: 9,
            path: '/project-registration',
            name: 'Project ',
            icon: <img src={imgPath.propertyRegistration} alt="documents" />,
          },
          {
            id: 10,
            path: '/project-geolocation',
            name: 'Project Geolocation',
            icon: <img src={imgPath.propertyRegistration} alt="documents" />,
          },
          {
            id: 11,
            path: '/device-geopoint',
            name: 'Device Geopoint',
            icon: <img src={imgPath.propertyRegistration} alt="documents" />,
          },
        ]
      : []),
  ];

  const renderSubMenu = (item) => (
    <div key={item.id} className="submenu">
      <button to="#" className="link w-100" onClick={() => toggleSubMenu(item.name)}>
        <div className="icon">{item.icon}</div>
        <div
          style={{
            display: isOpen && shouldToggleSubMenu(item.name) ? 'block' : 'none',
          }}
          className="link_text"
        >
          {item.name}
          {item.name === activeSubMenu ? (
            <FaChevronDown className="submenu-arrow" />
          ) : (
            <FaChevronRight className="submenu-arrow" />
          )}
        </div>
      </button>

      {shouldToggleSubMenu(item.name) && (
        <div className={`subitems ${activeSubMenu === item.name ? 'open' : ''}`}>
          {item.subMenu.map((subItem) => (
            <NavLink
              key={subItem.sub_id}
              to={subItem.path}
              className={`link submenu-link ${isMenuActive(subItem.path) ? 'active' : ''}`}
              activeclassname="active"
              style={{
                display: isOpen && activeSubMenu === item.name ? 'block' : 'none',
              }}
            >
              <div className="link_text icon"> {subItem.name}</div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );

  const renderLink = (item) => (
    <NavLink key={item.id} to={item.path} className={`link ${isMenuActive(item.path) ? 'active' : ''}`} activeclassname="active">
      <div className="icon">{item.icon}</div>
      <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
        {item.name}
      </div>
    </NavLink>
  );

  const renderSidebarItems = () => (
    <div>
      {menuItem.map((item) => (item.subMenu ? renderSubMenu(item) : renderLink(item)))}
    </div>
  );

  const isMenuActive = (path) => location.pathname === path;

  const loginPagePath = '/';
  const loginPagePathNew = '/login';
  const signUpPagePath = '/signup';

  return (
    <>
      {location.pathname !== loginPagePath && location.pathname !== signUpPagePath && location.pathname !== loginPagePathNew && (
        <div className="wrapper">
          <div style={{ width: isOpen ? '300px' : '50px' }} className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className="top_section" style={{ padding: isOpen ? '15px 15px' : '17px 5px' }}>
              <div style={{ display: isOpen ? 'block' : 'none' }}>
                <button className="logo-button" onClick={toggle}>
                  <img src={process.env.PUBLIC_URL + '/assets/img/logo.png'} className="logo" alt="logo" />
                </button>
              </div>
              <div style={{ display: isOpen ? 'none' : 'block' }}>
                <button className="logo-button" onClick={toggle}>
                  <img src={`${process.env.PUBLIC_URL}/assets/img/small-logo.png`} style={{ width: '40px', cursor: 'pointer' }} alt="logo" />
                </button>
              </div>
              <div style={{ display: isOpen ? 'block' : 'none', marginLeft: isOpen ? '50px' : '0px' }} className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>
            {renderSidebarItems()}
          </div>
          <main className="content">
            <Header />
            {children}
          </main>
        </div>
      )}
      {location.pathname === loginPagePath && <Login />}
      {location.pathname === loginPagePathNew && <Login />}
      {location.pathname === signUpPagePath && <Signup />}
    </>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
