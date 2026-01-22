import { useEffect, useState } from "react";
import API from "../api";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = () => {
    API.get("rooms/")
      .then(res => setRooms(res.data))
      .catch(err => console.log(err));
  };

  const updateStatus = (roomId, newStatus) => {
    API.patch(`rooms/${roomId}/`, { status: newStatus })
      .then(() => loadRooms())
      .catch(err => console.log(err));
  };

  const statusColor = status => {
    if (status === "available") return "success";
    if (status === "allotted") return "danger";
    if (status === "cleaned") return "primary";
    return "warning";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Room Management</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Room No</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.room_number}</td>
                <td className="text-capitalize">{room.room_type}</td>
                <td>₹{room.price}</td>

                <td>
                  <span className={`badge bg-${statusColor(room.status)}`}>
                    {room.status}
                  </span>
                </td>

                <td>
                  <select
                    className="form-select"
                    value={room.status}
                    onChange={e => updateStatus(room.id, e.target.value)}
                  >
                    <option value="available">Available</option>
                    <option value="allotted">Allotted</option>
                    <option value="cleaned">Cleaned</option>
                    <option value="dirty">Dirty</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
