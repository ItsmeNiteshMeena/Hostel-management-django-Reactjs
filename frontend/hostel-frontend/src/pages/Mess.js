import { useEffect, useState } from "react";
import API from "../api";

export default function Mess() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    API.get("mess/")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Weekly Mess Menu</h2>

      {menu.map(item => (
        <div className="card mb-3 shadow-sm" key={item.id}>
          <div className="card-body">
            <h5 className="card-title">{item.day}</h5>
            <p>🍳 <strong>Breakfast:</strong> {item.breakfast}</p>
            <p>🍛 <strong>Lunch:</strong> {item.lunch}</p>
            <p>🍽 <strong>Dinner:</strong> {item.dinner}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
