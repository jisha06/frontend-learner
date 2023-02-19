import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { FaPowerOff } from 'react-icons/fa';
import logo from '../logo.png'

const Navbarplacement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <Navbar style={{ backgroundColor: '#87CEEB' }} light expand="md">
      <NavbarBrand href='/placementofficer'>
        <img src={logo} alt="Logo" style={{ height: '50px' , margin:"10px"}} />
        Learner Dashboard
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" style={{marginLeft:"85%"}} navbar>
          <NavItem style={{ marginLeft:'90%' }}>
            <NavLink onClick={handleLogout} style={{ color: 'blue' }}>
              <FaPowerOff />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navbarplacement;