import React, { useEffect, useState } from "react";
import axios from "axios";
// if (!token) {
//   window.location.href = "/login";
// }


function StudentDashboard() {

  const [room, setRoom] = useState(null);
  const token = localStorage.getItem("access");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/rooms/my-room/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setRoom(res.data);
    })
    .catch(err => {
      console.log(err);
      alert("No room allotted yet");
    });

  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Student Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {room && (
        <div className="card shadow-lg p-4 animate__animated animate__fadeIn">
          <h4 className="mb-3">My Room Details</h4>

          <p><strong>Room Number:</strong> {room.room_number}</p>
          <p><strong>Room Type:</strong> {room.room_type}</p>
          <p><strong>Price:</strong> ₹{room.price}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`badge ms-2 ${
              room.room_status === "available" ? "bg-success" :
              room.room_status === "allotted" ? "bg-primary" :
              "bg-warning text-dark"
            }`}>
              {room.room_status}
            </span>
          </p>
          <p><strong>Allotment Date:</strong> {new Date(room.allotment_date).toLocaleString()}</p>
        </div>
      )}

    </div>
  );
}

export default StudentDashboard;
