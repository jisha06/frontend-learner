import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signin = () => {
    const navigate = useNavigate();
    const query = 0;
     //const serverurl ="api"
  const serverurl = "http://localhost:3001"
    const [data, setData] = useState({
        emailid: "",
        password: ""
    })
    const [errorMessage, seterrorMessage] = useState('');

    const inputHandler = (event) => {
        const { name, value } = event.target
        setData((previousState) => ({
            ...previousState,
            [name]: value

        }))
    }


    const formSubmitter = (e) => {
        e.preventDefault()

        axios.post(`${serverurl}/signin`, data)
            .then((response) => {
            
                if (response.data.status == "success") {
                    let token = response.data.token
                    let userid = response.data.data[0]._id
                    let position = response.data.data[0].position
                    let userName = response.data.data[0].name
                    sessionStorage.setItem("userid", userid)
                    sessionStorage.setItem("usertoken", token)
                    sessionStorage.setItem("position", position)
                    sessionStorage.setItem("userName", userName)
                    console.log(position)
                    seterrorMessage('')
                    if (position == "admin") { navigate('/trainplace/' + query) }
                    else {
                        if(position == "Trainer")
                        navigate('/traindash')
                        else
                        {
                            navigate('/placementOfficer')
                        }
                    }
                }
                else {
                    seterrorMessage('Invalid email or password')
                }

            })
            .catch((error) => {
                console.log(error)
            })
        console.log(errorMessage)        
    }


    return (
        <div>

            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={formSubmitter}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        {errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}

                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={inputHandler}
                                value={data.emailid}
                                name='emailid' />
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={inputHandler}
                                value={data.password}
                                name='password' />
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" >
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin
