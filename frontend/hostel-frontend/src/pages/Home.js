export default function Home() {
  return (
    <div className="container mt-5">
      <div
        className="p-5 text-white rounded"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560448075-bb4f94f42c9c')",
          backgroundSize: "cover",
        }}
        data-aos="fade-up"
      >
        <h1 className="display-5 fw-bold">Hostel Management System</h1>
        <p className="fs-4">
          Smart room allotment & mess management
        </p>
      </div>
    </div>
  );
}
