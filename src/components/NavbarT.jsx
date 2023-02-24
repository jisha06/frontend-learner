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

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const toggle = () => setIsOpen(!isOpen);  
  const history = useNavigate();
  const [name, setName] = useState(sessionStorage.getItem("userName"))
  const [position, setPosition] = useState(sessionStorage.getItem("position"))
  let nav = '/'
  
  if (position == "Trainer") { nav = '/traindash' }
  else if(position == "Placement-Officer"){ nav = '/placementOfficer' }
  else{nav='/trainplace/:query'}

  const handleLogout = () => {
    sessionStorage.clear();
    history('/');
  };
 

  return (
    <Navbar style={{ backgroundColor: '#87CEEB' }} light expand="md">
      <NavbarBrand href={nav}>
        <img src={logo} alt="Logo" style={{ height: '50px', margin: "10px" }} />
        Learner Dashboard
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
        </Nav>
       
      
        <Nav className="ml-auto" navbar>   
        <label className="boxeslevel" htmlFor="text" style={{fontSize: '25px', marginRight: '30%'}}>
                       {name}
                    </label>     
          <NavItem>            
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
