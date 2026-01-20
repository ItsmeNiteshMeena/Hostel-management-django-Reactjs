import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Rooms from "./pages/Rooms";
import Mess from "./pages/Mess";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/mess" element={<Mess />} />
      </Routes>
    </>
  );
}

export default App;
