import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComponent from './NavbarT';
import { Link } from 'react-router-dom';
import Papa from"papaparse";

const StudentList = () => {
  const [data, setData] = useState([]);
  let userName = sessionStorage.getItem("userName")

  //const serverurl ="api"
  const serverurl = "http://localhost:3001"

  const [file, setFile] = useState('');
  const [array, setArray] = useState([]);
 
  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = () => {
    axios.get(`${serverurl}/data`)
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d))
        });
        console.log(result.data)
        setArray(result.data)
        console.log("array  " + array)
      }
    })
  };  

  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log("CVDATA   " + JSON.stringify(array))
    let jsonArray = JSON.stringify(array)
    console.log("JSONARRAY" + jsonArray)
    axios.post('http://localhost:3001/cvupload', jsonArray)
      .then((response) => {
        console.log("Post " + response.data.status)
        if (response.data.status == "Success") {
          alert("Uploaded successfully!")
        }
        else {
          alert("Error " + response.data.status)
        }

      })
      .catch((error) => {
        console.log(error)
      })

    //console.log("CVDATA   " + array)
    // axios.post('http://localhost:3001/cvupload', array)
    //   .then((response) => {
    //     console.log("Post " + response.data.status)
    //     if (response.data.status == "Success") {
    //       alert("Uploaded successfully!")
    //       window.location.reload();      
    //     }

    //     else {
    //       alert("Error " + response.data.status)
    //     }

    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  };

  return (
    <>
      <NavbarComponent />
      <div className="container mt-4">
        <div>
          <Link to="/single-learner" className="btn btn-primary">Add New (+)</Link>
          <div>
            <input type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange} />
            <button className="btn btn-primary" onClick={(e) => { handleOnSubmit(e) }}> IMPORT CSV </button>
          </div>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Learner ID</th>
              <th>Name</th>
              <th>Course Name</th>
              <th>Project</th>
              <th>Batch</th>
              <th>Course Status</th>
              <th>Placement Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.learnerId}</td>
                <td>{item.name}</td>
                <td>{item.courseName}</td>
                <td>{item.project}</td>
                <td>{item.batch}</td>
                <td>{item.courseStatus}</td>
                <td>
                  {item.placementStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentList;
