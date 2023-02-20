import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FaPowerOff } from 'react-icons/fa';
import logo from '../logo.png'

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const history = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();

    history('/');
  };

  return (
    <Navbar style={{ backgroundColor: '#87CEEB' }} light expand="md">
      <NavbarBrand href='/'>
        <img src={logo} alt="Logo" style={{ height: '50px' , margin:"10px"}} />
        Learner Dashboard
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>         
        </Nav>
        <Nav className="ml-auto" style={{ marginLeft: "85%" }} navbar>
          <NavItem style={{ marginLeft: '90%' }}>
            <NavLink onClick={handleLogout} style={{ color: 'blue' }}>
              <FaPowerOff />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
