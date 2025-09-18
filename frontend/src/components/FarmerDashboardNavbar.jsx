import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const FarmerDashboardNavbar = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [farmerData, setFarmerData] = useState(null);
  const profileRef = useRef(null);

  // Load farmer data from localStorage and redirect if not logged in
  useEffect(() => {
    const storedFarmer = localStorage.getItem("farmer");
    if (!storedFarmer) {
      navigate("/farmer/login");
    } else {
      setFarmerData(JSON.parse(storedFarmer));
    }
  }, [navigate]);

  // Close profile dropdown on outside click or Escape key press
  useEffect(() => {
    if (!showProfile) return;

    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !event.target.closest("button[aria-haspopup='true']")
      ) {
        setShowProfile(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Focus profile card for accessibility when it opens
    if (profileRef.current) {
      profileRef.current.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showProfile]);

  // Logout handler clears localStorage and navigates to login
  const handleLogout = useCallback(() => {
    localStorage.removeItem("farmer");
    setFarmerData(null);
    navigate("/farmer/login");
  }, [navigate]);

  // Navigate to Farmer Market page
  const handleMarketClick = useCallback(() => {
    navigate("/farmer-market");
  }, [navigate]);

  return (
    <nav
      style={{
        background: "#2d6a4f",
        padding: "10px 20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Left: Farmer Dashboard clickable */}
      <div style={{ cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem" }}>
        <Link to="/farmer-dashboard" style={{ color: "white", textDecoration: "none" }}>
          Farmer Dashboard
        </Link>
      </div>

      {/* Right: Profile, Market, Logout buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <button
          onClick={() => setShowProfile((prev) => !prev)}
          style={buttonStyle}
          aria-haspopup="true"
          aria-expanded={showProfile}
          aria-controls="profile-card"
          aria-label="Toggle profile card"
          type="button"
        >
          Profile
        </button>

        <button
          onClick={handleMarketClick}
          style={buttonStyle}
          aria-haspopup="true"
          type="button"
        >
          Market
        </button>

        <button
          onClick={handleLogout}
          style={{ ...buttonStyle, backgroundColor: "#e63946" }}
          aria-haspopup="true"
          type="button"
        >
          Logout
        </button>
      </div>

      {/* Profile Card Dropdown */}
      {showProfile && farmerData && (
        <div
          id="profile-card"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={profileRef}
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            background: "white",
            color: "black",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            width: "250px",
            padding: "15px",
            zIndex: 1000,
            outline: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Online green dot */}
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: "limegreen",
                borderRadius: "50%",
              }}
              aria-label="Online status"
            />
            <h3 style={{ margin: 0, fontWeight: "600" }}>Online</h3>
          </div>

          <div style={{ marginTop: "10px" }}>
            <p>
              <strong>Username:</strong> {farmerData.username || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {farmerData.email || "N/A"}
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

const buttonStyle = {
  background: "#40916c",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  userSelect: "none",
};

export default FarmerDashboardNavbar;
