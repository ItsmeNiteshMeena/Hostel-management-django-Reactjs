import { useEffect, useState } from "react";
import API from "../api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    API.get("rooms/")
      .then(res => setRooms(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredRooms = rooms.filter(room => {
    if (filter === "all") return true;
    if (filter === "single") return room.room_type === "single";
    if (filter === "double") return room.room_type === "double";
    if (filter === "available") return room.status === "available";
  });

  const statusColor = status => {
    if (status === "available") return "success";
    if (status === "allotted") return "danger";
    if (status === "cleaned") return "primary";
    return "warning";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Hostel Rooms</h2>

      {/* FILTER BUTTONS */}
      <div className="mb-4">
        <button className="btn btn-outline-dark me-2" onClick={() => setFilter("all")}>All</button>
        <button className="btn btn-outline-primary me-2" onClick={() => setFilter("single")}>Single</button>
        <button className="btn btn-outline-secondary me-2" onClick={() => setFilter("double")}>Double</button>
        <button className="btn btn-outline-success" onClick={() => setFilter("available")}>Available</button>
      </div>

      {/* ROOM CARDS */}
      <div className="row">
        {filteredRooms.map(room => (
          <div className="col-md-4 mb-4" key={room.id}>
            <div className="card shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
                className="card-img-top"
                alt="room"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">Room {room.room_number}</h5>
                <p className="mb-1">Type: {room.room_type}</p>
                <p className="mb-1">Price: ₹{room.price}/month</p>

                <span className={`badge bg-${statusColor(room.status)}`}>
                  {room.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
