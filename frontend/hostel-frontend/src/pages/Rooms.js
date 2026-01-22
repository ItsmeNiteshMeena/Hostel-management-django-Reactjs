import { useEffect, useState } from "react";
import API from "../api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    API.get("rooms/").then(res => setRooms(res.data));
  }, []);

  const statusColor = status => {
    if (status === "available") return "success";
    if (status === "allotted") return "danger";
    if (status === "cleaned") return "primary";
    return "warning";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" data-aos="fade-right">Rooms</h2>

      <div className="row">
        {rooms.map(room => (
          <div className="col-md-4 mb-3" key={room.id} data-aos="zoom-in">
            <div className="card shadow">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
                className="card-img-top"
                alt="room"
              />
              <div className="card-body">
                <h5>Room {room.room_number}</h5>
                <p>Type: {room.room_type}</p>
                <p>₹{room.price}/month</p>
                <span className={`badge bg-${statusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
