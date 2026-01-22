import { useEffect, useState } from "react";
import API from "../api";

export default function Mess() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("mess/").then(res => setItems(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 data-aos="fade-left">Mess Menu</h2>

      {["breakfast", "lunch", "dinner"].map(meal => (
        <div key={meal} className="mt-4" data-aos="fade-up">
          <h4 className="text-capitalize">{meal}</h4>

          {items
            .filter(i => i.meal_type === meal)
            .map(item => (
              <div className="card mb-2 shadow-sm" key={item.id}>
                <div className="card-body d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
