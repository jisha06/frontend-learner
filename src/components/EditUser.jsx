import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './NavbarT';

const EditUser = () => {
    const [empdata, setData] = useState([])
    const navigate = useNavigate();
    const { empid } = useParams();


    const [name, namechange] = useState("");
    const [emailid, emailchange] = useState("");
    const [location, locationchange] = useState("");
    // const [password, passwordchange] = useState("");
    const [position, positionchange] = useState("");
    const [salary, salarychange] = useState("");


    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {

        console.log(empid)
        axios.post('http://localhost:3001/getuser', { "_id": empid })
            .then(
                (res) => {
                    console.log(res.data.name)
                    namechange(res.data.name)
                    emailchange(res.data.emailid)
                    // passwordchange(res.data.password)
                    locationchange(res.data.location)
                    positionchange(res.data.position)
                    salarychange(res.data.salary)
                }
            ).catch((error) => {
                console.log(error)
            })
    }

    //update user
    const updateValue = (e) => {
        e.preventDefault();
        const _id = empid
        const empdata = { _id, name, emailid, location, position, salary };
        console.log(empdata)
        axios.put('http://localhost:3001/updateUser', empdata)
            .then((response) => {
                console.log(response.data.status)
                if (response.data.status == "Success") {

                    alert("updated Successfuly");
                    navigate('/trainplace/' + 0)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const backUser = () => {
        navigate('/trainplace/' + 0)
    }

    return (
        <div>
            <Navbar />
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">Edit Trainer or Placement Officer</h3>
                        <div class="card">
                            <div class="card-body p-5">
                            </div>
                            <form>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example1cg">Name</label>
                                    <input type="text" id="form3Example1cg" class="form-control form-control-lg"
                                        onChange={e => namechange(e.target.value)}
                                        value={name}
                                        name='name' />

                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3cg">Email</label>
                                    <input type="email" id="form3Example3cg" class="form-control form-control-lg"
                                        onChange={e => emailchange(e.target.value)}
                                        value={emailid}
                                        name='emailid' />

                                </div>

                                {/* <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cg">Password</label>
                                    <input type="password" id="form3Example4cg" class="form-control form-control-lg"
                                        onChange={e => passwordchange(e.target.value)}
                                        value={password}
                                        name='password' />

                                </div> */}

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">location</label>
                                    <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                                        onChange={e => locationchange(e.target.value)}
                                        value={location}
                                        name='location' />

                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">Postition</label>
                                    <select class="form-control form-control-lg" value={position} name='position' onChange={e => positionchange(e.target.value)}>
                                        <option value={''}>--Select Position--</option>
                                        <option>Trainer</option>
                                        <option>Placement-Officer</option>
                                    </select>

                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">salary</label>
                                    <input type="text" class="form-control form-control-lg"
                                        onChange={e => salarychange(e.target.value)}
                                        value={salary}
                                        name='salary' />

                                </div>
                                <div class="d-flex justify-content-center">
                                    <button type="button"
                                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={updateValue}>Update</button>
                                    <button type="button"
                                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={backUser}>Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditUser
