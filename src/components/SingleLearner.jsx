import React, { useState } from 'react';
import axios from 'axios';
import NavbarComponent from './NavbarT';
import { useNavigate } from 'react-router-dom';

const courses = [
  { value: '', label: 'Choose...' },
  { value: 'FSD', label: 'FSD' },
  { value: 'DSA', label: 'DSA' },
  { value: 'ML-AI', label: 'ML-AI' },
  { value: 'RPA', label: 'RPA' },
  { value: 'ST', label: 'ST' },
  { value: 'CSA', label: 'CSA' },
];

const projects = [
  { value: '', label: 'Choose...' },
  { value: 'ICTAK', label: 'ICTAK' },
  { value: 'KKEM', label: 'KKEM' },
  { value: 'NORKA', label: 'NORKA' },
  { value: 'ABCD', label: 'ABCD' },
  { value: 'KDISC', label: 'KDISC' },
];

const batches = [
  { value: '', label: 'Choose...' },
  { value: 'May_22', label: 'May_22' },
  { value: 'Jun_22', label: 'Jun_22' },
  { value: 'Jul_22', label: 'Jul_22' },
  { value: 'Aug_22', label: 'Aug_22' },
];

const courseStatuses = [
  { value: '', label: 'Choose...' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Incompetent', label: 'Incompetent' },
];

const SingleLearner = () => {
  const [learnerId, setLearnerId] = useState('');
  const [name, setLearnerName] = useState('');
  const [courseName, setCourse] = useState('');
  const [project, setProject] = useState('');
  const [batch, setBatch] = useState('');
  const [courseStatus, setCourseStatus] = useState('');
  const navigate = useNavigate();
  //const serverurl ="api"
  const serverurl = "http://localhost:3001"
  const backUser = () => {
    navigate('/traindash')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (learnerId == '' || name == '' || courseName == '' || project == '' || batch == '' || courseStatus == '') {
      return alert("All fields are required")
    }
    const newLearnerData = {
      learnerId,
      name,
      courseName,
      project,
      batch,
      courseStatus,
    };

    try {
      await axios.post(`${serverurl}/addlearner`, newLearnerData);
      alert('Data submitted successfully!');
      navigate('/traindash')
      setLearnerId('');
      setLearnerName('');
      setCourse('');
      setProject('');
      setBatch('');
      setCourseStatus('');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      <NavbarComponent />
      <form
        style={{
          width: '55%',
          height: '43em',
          boxShadow: '5px 5px 5px gray',
          border: "1px solid black",
          borderRadius: '5px',
          marginTop: "5%",
          marginLeft: "23%"
        }}
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <div className="form-group col-md-12">
            <h2 style={{ textAlign: "center", fontFamily: 'cursive', textDecoration: "underline", paddingBottom: "2%" }}>Add learner data</h2>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="inputLearnerId"
              style={{
                marginLeft: "60%",
                marginTop: "2%"
              }}>Learner ID</label>
            <input
              style={{
                marginTop: "2%",
                marginLeft: "25%"
              }}
              type="text"
              className="form-control"
              id="inputLearnerId"
              placeholder="Learner ID"
              value={learnerId}
              onChange={(event) => setLearnerId(event.target.value)}
            />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="inputLearnerName"
              style={{
                marginLeft: "60%",
                marginTop: "2%"
              }}>Learner Name</label>
            <input
              style={{
                marginTop: "2%",
                marginLeft: "25%"
              }}
              type="text"
              className="form-control"
              id="inputLearnerName"
              placeholder="Learner Name"
              value={name}
              onChange={(event) => setLearnerName(event.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="inputCourse"
              style={{
                marginLeft: "60%",
                marginTop: "2%"
              }}>Course Name</label>
            <select
              style={{
                marginTop: "2%",
                marginLeft: "25%"
              }}
              id="inputCourse"
              className="form-control"
              value={courseName}
              onChange={(event) => setCourse(event.target.value)}
            >
              {courses.map((course, index) => (
                <option key={index} value={course.value}>
                  {course.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="inputProject"
              style={{
                marginLeft: "60%",
                marginTop: "2%"
              }}>Project Name</label>
            <select
              style={{
                marginTop: "2%",
                marginLeft: "25%"
              }}
              id="inputProject"
              className="form-control"
              value={project}
              onChange={(event) => setProject(event.target.value)}
            >
              {projects.map((project, index) => (
                <option key={index} value={project.value}>
                  {project.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-8">
            <label htmlFor="inputBatch"
              style={{
                marginLeft: "60%",
                marginTop: "2%"
              }}>Batch</label>
            <select
              style={{
                marginTop: "2%",
                marginLeft: "25%"
              }}
              id="inputBatch"
              className="form-control"
              value={batch}
              onChange={(event) => setBatch(event.target.value)}
            >
              {batches.map((batch, index) => (
                <option key={index} value={batch.value}>
                  {batch.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-8 ">
            <label htmlFor="inputCourseStatus"
              style={{
                marginLeft: "60%",
                marginTop: "2%"
              }}>Course Status</label>
            <select
              style={{
                marginTop: "2%",
                marginLeft: "25%"
              }}
              id="inputCourseStatus"
              className="form-control"
              value={courseStatus}
              onChange={(event) => setCourseStatus(event.target.value)}
            >
              {courseStatuses.map((courseStatus, index) => (
                <option key={index} value={courseStatus.value}>
                  {courseStatus.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button style={{ marginTop: "2%", marginLeft: "25%" }} type="submit" className="btn btn-primary">
          Submit
        </button>
        <button style={{ marginTop: "2%", marginLeft: "25%" }} type="submit" className="btn btn-primary" onClick={backUser}> Back
        </button>
      </form>
      <br />
    </>
  )
}

export default SingleLearner;
