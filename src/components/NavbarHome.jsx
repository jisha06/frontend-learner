import React from 'react'
import { useNavigate } from 'react-router-dom';

const NavbarHome = () => {
    const navigate = useNavigate();
    const login = () => {
        navigate('/login')
    }
    return (
        <div>
            <nav class="navbar navbar-dark bg-primary">
                <div class="container-fluid">
                {/* <img src="\images\logo.png"/> */}
                    <a class="navbar-brand">Learner Tracker</a>
                    <form class="d-flex" role="search" >
                        <button class="btn btn-primary  btn-lg float-left" type="submit" onClick={login}>Login</button>
                    </form>

                </div>
            </nav>
        </div>
    )
}

export default NavbarHome
