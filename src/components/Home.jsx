import React from 'react'
import NavbarHome from './NavbarHome'

const Home = () => {
    return (
        <div>
            <NavbarHome />
            <div class="bg-image" id='home' style={{ 
      backgroundImage:  `url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80 height: 100vh")` }}>
            <div>
            <h1 class="text-center"  style={{color: "white"}}>Welcome</h1>
            <h2 class="text-center" style={{color: "white"}}>ICTAK Learner Tracker </h2>
            </div>
            </div>
        </div>
    )
}

export default Home
