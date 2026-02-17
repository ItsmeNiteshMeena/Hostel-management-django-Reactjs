import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Mess from "./pages/Mess";
import AdminRooms from "./pages/AdminRooms";
import StudentDashboard from "./pages/StudentDashboard";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";


function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/mess" element={<Mess />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </>
  );
}

export default App;

