import { useEffect, useState } from "react";
import "./App.css";
import MapView from "./MapView";

// ✅ YOUR LIVE BACKEND
const BASE_URL = "https://traffic-backend-o84s.onrender.com";

function App() {
  const [detections, setDetections] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("dashboard"); // 🔥 navigation state

  // 🔄 Fetch all data
  const fetchAll = async () => {
    try {
      const res = await fetch(`${BASE_URL}/detections`);
      const data = await res.json();
      setDetections(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🔍 Search vehicle
  const searchVehicle = async () => {
    if (!search) return;

    try {
      const res = await fetch(`${BASE_URL}/search?plate=${search}`);
      const data = await res.json();
      setDetections(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // 🔄 Auto refresh
  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="header">
        <h1>🚦 City-Wide Traffic Monitoring</h1>
        <p>AI-Powered ANPR Traffic Intelligence</p>
      </header>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Traffic AI</h2>

        <button onClick={() => setPage("dashboard")}>📊 Dashboard</button>
        <button onClick={() => setPage("vehicles")}>🚗 Vehicles</button>
        <button onClick={() => setPage("alerts")}>🚨 Alerts</button>
        <button onClick={() => setPage("analytics")}>📈 Analytics</button>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* ================= DASHBOARD ================= */}
        {page === "dashboard" && (
          <>
            <h2>Dashboard Overview</h2>

            {/* STATS */}
            <div className="stats">
              <div className="stat-card">
                <h3>Total Detections</h3>
                <p>{detections.length}</p>
              </div>

              <div className="stat-card">
                <h3>Active Cameras</h3>
                <p>3</p>
              </div>

              <div className="stat-card">
                <h3>Vehicles Tracked</h3>
                <p>{detections.length}</p>
              </div>
            </div>

            {/* MAP */}
            <section className="map-section">
              <h2>GIS Traffic Map</h2>
              <div className="map-container">
                <MapView detections={detections} />
              </div>
            </section>
          </>
        )}

        {/* ================= VEHICLES ================= */}
        {page === "vehicles" && (
          <>
            <h2>Vehicle Search</h2>

            {/* SEARCH */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Enter plate number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button onClick={searchVehicle}>Search</button>
              <button onClick={fetchAll}>Reset</button>
            </div>

            {/* TABLE */}
            <table>
              <thead>
                <tr>
                  <th>License Plate</th>
                  <th>Camera</th>
                  <th>Location</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {detections.map((d, index) => (
                  <tr key={index}>
                    <td>{d.plate}</td>
                    <td>{d.camera}</td>
                    <td>{d.location}</td>
                    <td>{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ================= ALERTS ================= */}
        {page === "alerts" && (
          <>
            <h2>Alerts</h2>
            <p>No alerts implemented yet</p>
          </>
        )}

        {/* ================= ANALYTICS ================= */}
        {page === "analytics" && (
          <>
            <h2>Analytics</h2>
            <p>Coming soon...</p>
          </>
        )}

      </main>
    </div>
  );
}

export default App;