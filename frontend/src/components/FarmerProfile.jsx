import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerProfile.css";

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Load profile data saved separately (update key if your app uses different)
      const profileData = localStorage.getItem("farmerProfile");
      if (!profileData) {
        navigate("/farmer/login");
        return;
      }
      setFarmer(JSON.parse(profileData));
    } catch {
      // In case parsing fails, redirect to login
      navigate("/farmer/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!farmer) {
    return null; // Redirect will happen
  }

  return (
    <div className="farmer-profile-container">
      <h2>Farmer Profile</h2>
      <div className="profile-card">
        {farmer.photo ? (
          <img
            src={farmer.photo}
            alt={`${farmer.name || farmer.username}'s profile`}
            className="profile-photo"
          />
        ) : (
          <div className="profile-photo placeholder">No Photo</div>
        )}

        <p>
          <strong>Name:</strong> {farmer.name || farmer.username || "N/A"}
        </p>
        <p>
          <strong>Contact:</strong> {farmer.contact || "N/A"}
        </p>
        <p>
          <strong>Product:</strong> {farmer.product || "N/A"}
        </p>
        <p>
          <strong>Quantity:</strong> {farmer.quantity || "N/A"}
        </p>
        <p>
          <strong>Location:</strong> {farmer.location || "N/A"}
        </p>
        <p>
          <strong>Deadline:</strong>{" "}
          {farmer.deadline ? new Date(farmer.deadline).toLocaleString() : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default FarmerProfile;
