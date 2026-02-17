import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/api/login/", form);

    localStorage.setItem("access", res.data.access);
    alert("Login Successful!");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Student Login</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) => setForm({...form, username: e.target.value})}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          <button className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
