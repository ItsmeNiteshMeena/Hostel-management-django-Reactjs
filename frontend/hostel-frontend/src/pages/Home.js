import React from "react";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold animate__animated animate__fadeInDown">
        Welcome to Hostel Management System
      </h1>
      <p className="mt-3 text-muted">
        Manage Rooms, Mess & Students Efficiently 🚀
      </p>

      <img
        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
        alt="Hostel"
        className="img-fluid mt-4 rounded shadow"
        style={{ maxHeight: "400px" }}
      />
    </div>
  );
}

export default Home;
