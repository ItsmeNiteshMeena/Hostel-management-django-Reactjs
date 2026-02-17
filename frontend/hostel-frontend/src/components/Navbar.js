import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("access");

  const logout = () => {
    localStorage.removeItem("access");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🏨 HostelMS
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/rooms">Rooms</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/mess">Mess</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Panel</Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-danger ms-2" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
