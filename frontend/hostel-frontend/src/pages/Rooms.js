import { useEffect, useState } from "react";
import API from "../api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    API.get("rooms/")
      .then(res => setRooms(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Rooms</h2>

      <div className="row">
        {rooms.map(room => (
          <div className="col-md-4 mb-3" key={room.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Room {room.room_number}</h5>
                <p className="card-text">Capacity: {room.capacity}</p>
                <p className="card-text">Occupied: {room.occupied}</p>
                <p className={`badge ${room.occupied < room.capacity ? 'bg-success' : 'bg-danger'}`}>
                  {room.occupied < room.capacity ? "Available" : "Full"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
