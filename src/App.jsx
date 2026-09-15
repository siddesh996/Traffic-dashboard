import './App.css'
import MapView from './MapView'
import { useEffect, useState } from "react"

function App() {

  const [page, setPage] = useState("dashboard")
  const [detections, setDetections] = useState([])

  // 🔥 Fetch every 3 seconds
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/detections")
        .then(res => res.json())
        .then(data => setDetections(data))
        .catch(err => console.log(err))
    }

    fetchData()
    const interval = setInterval(fetchData, 3000)

    return () => clearInterval(interval)
  }, [])

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

        <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>📊 Dashboard</button>
        <button className={page==="vehicles"?"active":""} onClick={()=>setPage("vehicles")}>🚗 Vehicles</button>
        <button className={page==="alerts"?"active":""} onClick={()=>setPage("alerts")}>🚨 Alerts</button>
        <button className={page==="analytics"?"active":""} onClick={()=>setPage("analytics")}>📈 Analytics</button>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            <h2>Dashboard Overview</h2>

            <div className="stats">
              <div className="stat-card">
                <h3>Total Detections</h3>
                <p>{detections.length}</p>
              </div>

              <div className="stat-card">
                <h3>Active Cameras</h3>
                <p>28</p>
              </div>

              <div className="stat-card">
                <h3>Active Alerts</h3>
                <p>7</p>
              </div>

              <div className="stat-card">
                <h3>Vehicles Tracked</h3>
                <p>{detections.length}</p>
              </div>
            </div>

            <section className="map-section">
              <h2>GIS Traffic Map</h2>
              <div className="map-container">
                <MapView />
              </div>
            </section>

            <section>
              <h2>Recent Detections</h2>

              <table>
                <thead>
                  <tr>
                    <th>Plate</th>
                    <th>Camera</th>
                    <th>Location</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {detections.map((d, i) => (
                    <tr key={i}>
                      <td>{d.plate}</td>
                      <td>{d.camera}</td>
                      <td>{d.location}</td>
                      <td>{d.time}</td> {/* ✅ REAL TIME FROM BACKEND */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VEHICLES */}
        {page === "vehicles" && (
          <div>
            <h2>Vehicle Search</h2>
            <input placeholder="Enter plate number" />
            <button>Search</button>
          </div>
        )}

        {/* ALERTS */}
        {page === "alerts" && (
          <div>
            <h2>Alerts</h2>
            <p>🚨 KA01AB1234 detected (Blacklisted)</p>
          </div>
        )}

        {/* ANALYTICS */}
        {page === "analytics" && (
          <div>
            <h2>Analytics</h2>
            <p>Charts coming soon...</p>
          </div>
        )}

      </main>
    </div>
  )
}

export default App