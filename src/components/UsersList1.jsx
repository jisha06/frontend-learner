import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Navbar from './Navbar';

const TrainPlace = () => {
    const [empdata, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        loadEmployee();
    }, [])

    const loadEmployee = () => {
        axios.get('http://localhost:3001/viewemployee')
            .then(
                (res) => {
                    console.log(res.data)
                    setData(res.data)
                }
            ).catch((error) => {
                console.log(error)
            })
    }

    const deleteEmployee = (empid) => {
        console.log(empid)
        console.log("delete " + { _id: empid })

        axios.delete('http://localhost:3001/deleteEmployee/' + empid)
            .then((res) => {
                console.log(res.status)
                if (res.status == 200) {
                    alert("Employee Successfuly deleted")
                    window.location.reload();
                }
                else {
                    alert("error")
                }
            })
            .catch((error) => {
                alert("Something went wrong")
            })
    }

    const editEmployee = (id) => {

        navigate("/editemployee/" + id)
    }
    return (
        <div>
            <Navbar />
            <div className='container'>

                <div className="py-4">
                    <h3 class="mb-3 text-center">Trainer/Placement Officer Details</h3>
                    <div className="divbtn">
                        <Link to="/addemployee" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table class="table border shadow">
                        <thead class="thead-primary">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Email Id</th>
                                <th scope="col">Location</th>
                                <th scope="col">Designation</th>

                            </tr>
                        </thead>
                        <tbody>
                            {empdata.map((value, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.name}</td>
                                    <td>{value.emailid}</td>
                                    <td>{value.location}</td>
                                    <td>{value.designation}</td>
                                    <td>
                                        <button className='btn btn-prinmary btn-success' onClick={() => deleteEmployee(value._id)}>Delete</button>
                                        <button className='btn btn-prinmary btn-danger' onClick={() => editEmployee(value._id)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TrainPlace
