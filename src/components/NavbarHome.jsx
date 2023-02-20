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

const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const navigate = useNavigate();
    const login = () => {
        navigate('/login')
    }
    return (

        <Navbar style={{ backgroundColor: '#87CEEB' }} light expand="md">
            <NavbarBrand href='/trainer'>
                <img src={logo} alt="Logo" style={{ height: '50px', margin: "10px" }} />
                Learner Dashboard
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>

                </Nav>
                <Nav className="ml-auto" style={{ marginLeft: "85%" }} navbar>
                    <NavItem style={{ marginLeft: '30%' }}>
                        <button class="btn btn-primary  btn-lg float-left" type="submit" onClick={login}>Login</button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>

    )
}

export default NavbarHome
