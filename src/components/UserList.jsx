import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Navbar from './Navbar';

const UserList = () => {
    const [empdata, setData] = useState([])
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const [userId, setUserid] = useState(sessionStorage.getItem("userid"))
    const [token, setToken] = useState(sessionStorage.getItem("usertoken"))

    console.log(query)
    useEffect(() => {

        if (query.length > 0) { loadUser(query) }
        else {
            loadUser(0);
        }

    }, [query])

    const loadUser = (query) => {
        console.log("Loaduser" + query)
        //const userdata = {userId, token, query}
        axios.get('http://localhost:3001/viewuser/' + query)

            .then(
                (res) => {
                    console.log(res.data)
                    setData(res.data)
                }
            ).catch((error) => {
                console.log(error)
            })
    }

    //delete user
    const deleteUser = (userid) => {
        console.log(userid)

        axios.delete('http://localhost:3001/deleteUser/' + userid)
            .then((res) => {
                console.log(res.status)
                if (res.status == 200) {
                    alert("User Successfuly deleted")
                    loadUser(0);
                }
                else {
                    alert("error")
                }
            })
            .catch((error) => {
                alert("Something went wrong")
            })
    }

    //edit
    const editUser = (id) => {

        navigate("/edituser/" + id)
    }

    return (
        <div className='container'>
            <Navbar />
            <div className="py-4">
                <h3 class="mb-3 text-center">Trainer/Placement Officer Details</h3>
                <div className="divbtn">
                    <Link to="/addtrainer" className="btn btn-success">Add New (+)</Link>                    
                </div>
                <div class="form-outline">
                    <input type="search" id="form1" class="form-control" placeholder="Search..." aria-label="Search" onChange={(e) => setQuery(e.target.value)} />
                </div>
                <table class="table border shadow">
                    <thead class="thead-primary">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email Id</th>
                            <th scope="col">Location</th>
                            <th scope="col">Posistion</th>

                        </tr>
                    </thead>
                    <tbody>
                        {empdata.map((value, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{value.name}</td>
                                <td>{value.emailid}</td>
                                <td>{value.location}</td>
                                <td>{value.position}</td>
                                <td>
                                    <button className='btn btn-prinmary btn-success' onClick={() => deleteUser(value._id)}>Delete</button>
                                    <button className='btn btn-prinmary btn-danger' onClick={() => editUser(value._id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default UserList
