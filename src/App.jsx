import { useEffect, useState } from "react";
import "./App.css";
import MapView from "./MapView";

// ✅ YOUR LIVE BACKEND
const BASE_URL = "https://traffic-backend-o84s.onrender.com";

function App() {
  const [detections, setDetections] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Fetch all detections
  const fetchAll = async () => {
    try {
      console.log("Fetching all detections...");
      const res = await fetch(`${BASE_URL}/detections`);
      const data = await res.json();
      console.log("All data:", data);
      setDetections(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ✅ Search vehicle
  const searchVehicle = async () => {
    if (!search) return;

    try {
      console.log("Searching:", search);

      const res = await fetch(
        `${BASE_URL}/search?plate=${search}`
      );

      const data = await res.json();
      console.log("Search result:", data);

      setDetections(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // ✅ Auto refresh
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

        <button onClick={() => alert("Dashboard clicked")}>
          📊 Dashboard
        </button>

        <button onClick={() => alert("Vehicles clicked")}>
          🚗 Vehicles
        </button>

        <button onClick={() => alert("Alerts clicked")}>
          🚨 Alerts
        </button>

        <button onClick={() => alert("Analytics clicked")}>
          📈 Analytics
        </button>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <h2>Dashboard Overview</h2>

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

        {/* TABLE */}
        <section>
          <h2>Recent Detections</h2>

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
              {detections.length > 0 ? (
                detections.map((d, index) => (
                  <tr key={index}>
                    <td>{d.plate}</td>
                    <td>{d.camera}</td>
                    <td>{d.location}</td>
                    <td>{d.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  );
}

export default App;