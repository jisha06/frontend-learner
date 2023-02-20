import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComponent from './NavbarT';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const StudentList = () => {
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const navigate = useNavigate();
  let userName = sessionStorage.getItem("userName")

  const [file, setFile] = useState('');
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent =()=>{
    axios.get('http://localhost:3001/data')
    .then(response => setData(response.data))
    .catch(error => console.error(error));
  }
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
 
    const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});       
        return obj;
    });
   console.log("newArray    " +array)
    setArray(array);
};

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        console.log("text  " + text)
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
    else{
      return alert("Choose file")
    }

    console.log("CVDATA   " + array)
    axios.post('http://localhost:3001/cvupload', array)
      .then((response) => {
        console.log("Post " + response.data.status)
        if (response.data.status == "Success") {
          alert("Uploaded successfully!")
          window.location.reload();      
        }

        else {
          alert("Error " + response.data.status)
        }

      })
      .catch((error) => {
        console.log(error)
      })
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
