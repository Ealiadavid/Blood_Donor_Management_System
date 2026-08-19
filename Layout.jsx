import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged Out Successfully 👋");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh"
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          minWidth: "260px",
          height: "100vh",
          backgroundColor: "#dc3545",
          color: "white",
          padding: "25px",
          position: "fixed",
          top: 0,
          left: 0
        }}
      >
        <h3>🩸 Blood Donor</h3>

        <hr />

        <Link
          to="/dashboard"
          style={{
            color: "white",
            display: "block",
            marginBottom: "20px",
            textDecoration: "none",
            fontSize: "17px"
          }}
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/add-donor"
          style={{
            color: "white",
            display: "block",
            marginBottom: "20px",
            textDecoration: "none",
            fontSize: "17px"
          }}
        >
          ➕ Add Donor
        </Link>

        <Link
          to="/donors"
          style={{
            color: "white",
            display: "block",
            marginBottom: "20px",
            textDecoration: "none",
            fontSize: "17px"
          }}
        >
          📋 View Donors
        </Link>

        <Link
          to="/search"
          style={{
            color: "white",
            display: "block",
            marginBottom: "20px",
            textDecoration: "none",
            fontSize: "17px"
          }}
        >
          🔍 Search Donor
        </Link>
        <Link
          to="/emergency-request"
          style={{
            color: "white",
            display: "block",
            marginBottom: "20px",
            textDecoration: "none",
            fontSize: "17px"
          }}
        >
          🚨 Emergency Request
        </Link>
        <span
          onClick={handleLogout}
          style={{
            color: "white",
            display: "block",
            marginBottom: "20px",
            textDecoration: "none",
            fontSize: "17px",
            cursor: "pointer"
          }}
        >
          🚪 Logout
        </span>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)"
        }}
      >
        <nav
          style={{
            padding: "18px",
            backgroundColor: "#f8f9fa",
            boxShadow: "0 2px 5px #ccc"
          }}
        >
          <h5 className="mb-0">Admin Dashboard</h5>
        </nav>

        <div style={{ padding: "25px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;