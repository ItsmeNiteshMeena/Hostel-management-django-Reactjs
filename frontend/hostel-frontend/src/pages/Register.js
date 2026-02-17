import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/register/", form);
    alert("Registered Successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 animate__animated animate__fadeIn">
        <h3 className="text-center mb-3">Student Register</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) => setForm({...form, username: e.target.value})}
          />
          <input
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
