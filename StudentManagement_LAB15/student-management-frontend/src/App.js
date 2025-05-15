import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ptcLogo from "./assets/ptc-logo.png"; // 🔷 Add your logo path here

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [math, setMath] = useState("");
  const [science, setScience] = useState("");
  const [english, setEnglish] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3001/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/add", {
        name,
        math: parseInt(math),
        science: parseInt(science),
        english: parseInt(english),
      });

      alert("Student added successfully!");
      setName("");
      setMath("");
      setScience("");
      setEnglish("");
      fetchStudents();
    } catch (err) {
      alert("Failed to add student.");
      console.error(err.message);
    }
  };

  return (
    <div className="app-container">
      {/* 🔷 Top Banner with Logo */}
      <div className="top-logo-banner">
        <img src={ptcLogo} alt="PTC Logo" className="top-logo" />
        <h2 className="school-name">Pateros Technological College</h2>
      </div>

      {/* 🔷 Page Header */}
      <header className="app-header">
        <h1>Student Management System</h1>
      </header>

      {/* 🔷 Form Section */}
      <div className="container card">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Math</Form.Label>
            <Form.Control
              type="number"
              value={math}
              onChange={(e) => setMath(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Science</Form.Label>
            <Form.Control
              type="number"
              value={science}
              onChange={(e) => setScience(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>English</Form.Label>
            <Form.Control
              type="number"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="mt-3" type="submit">
            Add Student
          </Button>
        </Form>
      </div>

      {/* 🔷 Student List Section */}
      {students.length > 0 && (
        <div className="container mt-5 card">
          <h4>Student List</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Math</th>
                <th>Science</th>
                <th>English</th>
                <th>Average</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.math}</td>
                  <td>{student.science}</td>
                  <td>{student.english}</td>
                  <td>{student.average}</td>
                  <td>{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default App;
