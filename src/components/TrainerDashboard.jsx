import React, { useState } from 'react'
import Navbar from './Navbar';
const TrainerDashboard = () => {
  const[userId, setUserid] = useState(sessionStorage.getItem("userid"));
  const[token, setToken] = useState(sessionStorage.getItem("token"));
  return (
    <div>
      <Navbar />
      <h1> Welcome to Trainer Dashboard</h1>
    </div>
  )
}

export default TrainerDashboard
