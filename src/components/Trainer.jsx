import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarComponent from './Navbar';

const StudentList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <NavbarComponent/>
    <div className="container mt-4">
      <h2 style={{textAlign:"center",fontFamily:"fantasy"}}> Learner List</h2>
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
