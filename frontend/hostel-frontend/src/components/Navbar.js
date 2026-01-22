import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">HostelMS</Link>

        <div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/rooms">Rooms</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mess">Mess</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-warning" to="/admin/rooms">
                 Admin Panel
               </Link>
             </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
