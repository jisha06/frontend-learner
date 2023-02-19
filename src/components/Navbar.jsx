import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const btnSignout = () => {
        sessionStorage.clear();
        navigate("/")
    }

    return (
        <div>
            <nav class="navbar navbar-dark bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand">Learner Tracker</a>
                    <form class="d-flex" role="search" >                       
                            <button class="btn btn-primary  btn-lg float-left" type="submit" onClick={btnSignout}>Signout</button>
                    </form>
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar
