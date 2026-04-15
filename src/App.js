import React, { useState } from "react";
import "./App.css";

/* Student banane ke liye class */
class Student {
  constructor(name, age, course) {
    this.name = name;
    this.age = age;
    this.course = course;
  }
}

function App() {

  // Student list store karega
  const [students, setStudents] = useState([]);

  // Button click count
  const [count, setCount] = useState(0);

  // List show / hide
  const [showList, setShowList] = useState(false);

  // Form ka data (input values)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: ""
  });

  /* Input me kuch likhne par yeh chalega */
  const handleChange = (e) => {
    setFormData({
      ...formData,                 // purana data rakho
      [e.target.name]: e.target.value   // naya value update karo
    });
  };

  /* Form submit hone par */
  const handleSubmit = (e) => {
    e.preventDefault(); // page reload na ho

    // Check karo sab filled hai ya nahi
    if (!formData.name || !formData.age || !formData.course) {
      alert("Sab fill karo");
      return;
    }

    // Age check
    if (formData.age < 18) {
      alert("Age should be greater than 18");
      return;
    }

    // Naya student banao
    const newStudent = new Student(
      formData.name,
      Number(formData.age),
      formData.course
    );

    // List me add karo
    setStudents([...students, newStudent]);

    // Form clear karo
    setFormData({ name: "", age: "", course: "" });
  };

  /* Student delete */
  const deleteStudent = (index) => {
    const newList = students.filter((_, i) => i !== index);
    setStudents(newList);
  };

  /* Sirf age > 18 wale dikhane ke liye */
  const showAdults = () => {
    const filtered = students.filter((s) => s.age > 18);
    setStudents(filtered);
  };

  /* Button click count */
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="container">

      {/* Heading */}
      <div className="header">
        <h1>STUDENT MANAGEMENT SYSTEM</h1>
      </div>

      {/* Click count button */}
      <div className="section">
        <button onClick={handleClick}>
          Click Count: {count}
        </button>
      </div>

      {/* Add student form */}
      <div className="add-section">
        <h2>ADD STUDENT</h2>

        <form onSubmit={handleSubmit} className="form-box">

          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <label>Course:</label>
          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
          />

          <button type="submit">Add Student</button>
        </form>
      </div>

      {/* View student */}
      <div className="view-section">
        <h2>VIEW STUDENT</h2>

        {/* Show / Hide */}
        <button onClick={() => setShowList(!showList)}>
          {showList ? "Hide Students" : "View Students"}
        </button>

        {/* Filter */}
        <button onClick={showAdults}>
          Show Age {'>'} 18
        </button>

        {/* Student list */}
        {showList && (
          <div className="student-list">

            {students.length === 0 ? (
              <p>Koi student nahi hai</p>
            ) : (
              students.map((s, index) => (
                <div key={index} className="student-item">

                  {/* Student details */}
                  <div>
                    <p><b>Name:</b> {s.name}</p>
                    <p><b>Age:</b> {s.age}</p>
                    <p><b>Course:</b> {s.course}</p>
                  </div>

                  {/* Delete button */}
                  <button onClick={() => deleteStudent(index)}>
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>
        )}
      </div>

    </div>
  );
}

export default App;