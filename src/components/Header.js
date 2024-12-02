import React from 'react';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { imgPath } from './Constants';

const Header = () => {
  const navigate = useNavigate();
  const customerName = localStorage.getItem('customerName');
  const company_name = localStorage.getItem('company_name');
  const address = localStorage.getItem('address');
  
  // Handler function for logout
  const handleLogout = () => {
    // Perform API request to logout the user here
    // For example:
    // axios.post('/api/logout')
    //     .then(response => {
    //         // Handle successful logout
    //         history.push('/login'); // Redirect to login page after logout
    //     })
    //     .catch(error => {
    //         // Handle error
    //     });
    localStorage.removeItem('token');
    // For now, let's assume logout is successful and redirect to login page
    navigate('/login'); // Redirect to login page after logout
  };
  return (
    <div className="header">
      <Navbar>
        <Container fluid className="justify-content-end">
          {/* <form className="search-bar d-flex">
						<FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
						<input className="form-control" type="search" placeholder="Search" aria-label="Search" />
					</form> */}
          {/* <BreadCrumb /> */}
          <Navbar className="px-4">
            <Nav>
              {/* 	<Dropdown className='notification-icon'>
								<Dropdown.Toggle as={'div'} id="dropdown-basic">
									<FontAwesomeIcon icon={faBell} />
									<Badge className="badge-counter">3+</Badge>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Header className='notification-header'>Alert Center</Dropdown.Header>
									<Dropdown.Item href="#/action-1">
										Alert 1
									</Dropdown.Item>
									<Dropdown.Item href="#/action-1">
										Alert 2
									</Dropdown.Item>
									<Dropdown.Item href="#/action-1">
										Alert 3
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item className='notification-footer' href="#/action-2">Show all alert</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown> */}
              <Dropdown className="user-dropdown">
                <Dropdown.Toggle as={'div'} id="dropdown-basic">
                  <img src={imgPath.vao} alt="avatar" className="user-img" />{' '}
                  {customerName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <h6>{customerName}</h6>
                    <h6>{company_name}</h6>
                    <span>{address}</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
