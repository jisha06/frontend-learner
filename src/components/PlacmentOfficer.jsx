import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbarplacement from "./NavbarT";

const PlacementOfficer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  //const serverurl ="api"
  const serverurl = "http://localhost:3001"

  useEffect(() => {
    axios
      .get(`${serverurl}/data`)
      .then(response => setData(response.data))
      .catch(error => setError(error));
  }, []);

  const handlePlacementStatusChange = (event, learner) => {
    const newPlacementStatus = event.target.value;
    axios
      .put(`${serverurl}/learners/${learner._id}/placement`, {
        placementStatus: newPlacementStatus
      })
      .then(response => {
        setData(
          data.map(item =>
            item._id === response.data._id ? response.data : item
          )
        );
        window.alert("Placement Details Updated");
        window.location.reload();
      })
      .catch(error => setError(error));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbarplacement />
      <div className="container mt-4">
        <h2 style={{ textAlign: "center", fontFamily: "fantasy" }}> Learner List</h2>
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
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.learnerId}</td>
                <td>{student.name}</td>
                <td>{student.courseName}</td>
                <td>{student.project}</td>
                <td>{student.batch}</td>
                <td>{student.courseStatus}</td>
                <td>
                  <select value={student.placementStatus} onChange={(event) => handlePlacementStatusChange(event, student)}>
                    <option value="Job Seeking">Job Seeking</option>
                    <option value="Placed">Placed</option>
                    <option value="not interested">Not Interested</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PlacementOfficer;
