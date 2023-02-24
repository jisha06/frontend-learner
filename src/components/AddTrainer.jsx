import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './NavbarT'

const AddTrainer = () => {
  
  <ToastContainer />
  //const serverurl ="api"
  const serverurl = "http://localhost:3001"
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    emailid: '',
    password: '',
    location: '',
    position: '',
    salary: 0
  })

  const inputHandler = (event) => {
    const { name, value } = event.target
    setData((previousState) => ({
      ...previousState,
      [name]: value

    }))
  }
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const readValue = () => {
    console.log(data)
    if (data.name == '' || data.emailid == '' || data.password == '' || data.position == '') {

      return alert("All fields are required")
    }
    if (data.emailid) {
      let validate = validateEmail(data.emailid)

      if (validate == null) {
        return alert("Please enter a valid email")
      }
      else {

        axios.post(`${serverurl}/addUser`, data)
          .then((response) => {
            console.log("Post " + response.data)
            if (response.data.status == "Success") {
              setData({
                name: '',
                emailid: '',
                password: '',
                location: '',
                position: '',
                salary: ''
              })

            }
          })
          .catch((error) => {
            console.log(error)
          })
        navigate('/trainplace/' + 0)
      }
    }

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
            <h3 class="text-uppercase text-center mb-5">Add Trainer or Placement Officer</h3>
            <div class="card">
              <div class="card-body p-5">
                <form>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example1cg">Name</label>
                    <input type="text" id="form3Example1cg" class="form-control form-control-lg"
                      onChange={inputHandler}
                      value={data.name}
                      name='name' />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example3cg">Email</label>
                    <input type="email" id="form3Example3cg" class="form-control form-control-lg"
                      onChange={inputHandler}
                      value={data.emailid}
                      name='emailid' />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4cg">Password</label>
                    <input type="password" id="form3Example4cg" class="form-control form-control-lg"
                      onChange={inputHandler}
                      value={data.password}
                      name='password' />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4cdg">location</label>
                    <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                      onChange={inputHandler}
                      value={data.location}
                      name='location' />

                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4cdg">Postition</label>
                    <select class="form-control form-control-lg" value={data.position} name='position' onChange={inputHandler}>
                      <option value={''}>--Select Position--</option>
                      <option>Trainer</option>
                      <option>Placement-Officer</option>
                    </select>

                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4cdg">salary</label>
                    <input type="text" id="form3Example4cdg" class="form-control form-control-lg"
                      onChange={inputHandler}
                      value={data.salary}
                      name='salary' />

                  </div>


                  <div class="d-flex justify-content-center">
                    <button type="button"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={readValue}>Add</button>
                    <button type="button"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={backUser}>Back</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>







  )
}

export default AddTrainer
