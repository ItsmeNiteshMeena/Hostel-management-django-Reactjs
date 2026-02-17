import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBed, FaCheckCircle, FaUserGraduate, FaMoneyBillWave, FaBroom } from "react-icons/fa";

function AdminPanel() {

  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("access");

  useEffect(() => {

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.get("http://127.0.0.1:8000/api/rooms/admin-stats/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setStats(res.data);
    })
    .catch(err => {
      alert("Only admin can access this page");
      window.location.href = "/";
    });

  }, []);

  if (!stats) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">

      <h2 className="fw-bold mb-4 animate__animated animate__fadeInDown">
        📊 Admin Dashboard
      </h2>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow text-center p-4 border-0 bg-primary text-white">
            <FaBed size={40} />
            <h4 className="mt-3">{stats.total_rooms}</h4>
            <p>Total Rooms</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-4 border-0 bg-success text-white">
            <FaCheckCircle size={40} />
            <h4 className="mt-3">{stats.available_rooms}</h4>
            <p>Available Rooms</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-4 border-0 bg-info text-white">
            <FaUserGraduate size={40} />
            <h4 className="mt-3">{stats.total_students_allotted}</h4>
            <p>Students Allotted</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-4 border-0 bg-warning text-dark">
            <FaBroom size={40} />
            <h4 className="mt-3">{stats.dirty_rooms}</h4>
            <p>Dirty Rooms</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-4 border-0 bg-secondary text-white">
            <FaBed size={40} />
            <h4 className="mt-3">{stats.allotted_rooms}</h4>
            <p>Allotted Rooms</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-4 border-0 bg-dark text-white">
            <FaMoneyBillWave size={40} />
            <h4 className="mt-3">₹ {stats.monthly_revenue}</h4>
            <p>Monthly Revenue</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;
