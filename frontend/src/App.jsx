import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import ClientHome from "./components/ClientHome";
import FarmerHome from "./components/FarmerHome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientLogin from "./components/ClientLogin";
import ClientRegister from "./components/ClientRegister";
import FarmerLogin from "./components/FarmerLogin";
import FarmerRegister from "./components/FarmerRegister";
import FarmerDashboard from "./components/FarmerDashboard";
import FarmerProfile from "./components/FarmerProfile";
import FarmerDashboardNavbar from "./components/FarmerDashboardNavbar";
import FarmerMarket from "./components/FarmerMarket";
import ClientDashboard from "./components/ClientDashboard";
import ClientDashboardNavbar from "./components/ClientDashboardNavbar";

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [storedFarmer, setStoredFarmer] = useState(null);
  const [storedClient, setStoredClient] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const savedFarmer = localStorage.getItem("farmer");
      const savedClient = localStorage.getItem("client");
      setStoredFarmer(savedFarmer ? JSON.parse(savedFarmer) : null);
      setStoredClient(savedClient ? JSON.parse(savedClient) : null);
    } catch {
      setStoredFarmer(null);
      setStoredClient(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const handleFarmerLogout = () => {
    localStorage.removeItem("farmer");
    setStoredFarmer(null);
    navigate("/farmer/login");
  };

  const handleClientLogout = () => {
    localStorage.removeItem("client");
    setStoredClient(null);
    navigate("/client/login");
  };

  const farmerDashboardPaths = [
    "/farmer-dashboard",
    "/farmer-profile",
    "/farmer-market",
  ];
  const clientDashboardPaths = ["/client-dashboard"];

  const isFarmerDashboard = farmerDashboardPaths.includes(location.pathname);
  const isClientDashboard = clientDashboardPaths.includes(location.pathname);

  const isAuthenticatedFarmer = (farmer) =>
    farmer &&
    ((typeof farmer.username === "string" && farmer.username.trim() !== "") ||
      (typeof farmer.name === "string" && farmer.name.trim() !== ""));

  const isAuthenticatedClient = (client) =>
    client &&
    ((typeof client.username === "string" && client.username.trim() !== "") ||
      (typeof client.name === "string" && client.name.trim() !== ""));

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isFarmerDashboard ? (
        <FarmerDashboardNavbar
          farmerName={
            (storedFarmer && (storedFarmer.name || storedFarmer.username)) ||
            "Farmer"
          }
          onLogout={handleFarmerLogout}
        />
      ) : isClientDashboard ? (
        <ClientDashboardNavbar
          clientName={
            (storedClient && (storedClient.name || storedClient.username)) ||
            "Client"
          }
          onLogout={handleClientLogout}
        />
      ) : (
        <Navbar />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Client Routes */}
        <Route
          path="/client"
          element={<ClientHome email={storedClient?.email ?? ""} />}
        />
        <Route
          path="/client/login"
          element={<ClientLogin setStoredClient={setStoredClient} />}
        />
        <Route
          path="/client/register"
          element={<ClientRegister setStoredClient={setStoredClient} />}
        />
        <Route
          path="/client-dashboard"
          element={
            isAuthenticatedClient(storedClient) ? (
              <ClientDashboard />
            ) : (
              <Navigate to="/client/login" replace />
            )
          }
        />

        {/* Farmer Routes */}
        <Route
          path="/farmer"
          element={<FarmerHome email={storedFarmer?.email ?? ""} />}
        />
        <Route
          path="/farmer/login"
          element={<FarmerLogin setStoredFarmer={setStoredFarmer} />}
        />
        <Route
          path="/farmer/register"
          element={<FarmerRegister setStoredFarmer={setStoredFarmer} />}
        />

        {/* Protected Farmer Routes */}
        <Route
          path="/farmer-dashboard"
          element={
            isAuthenticatedFarmer(storedFarmer) ? (
              <FarmerDashboard />
            ) : (
              <Navigate to="/farmer/login" replace />
            )
          }
        />
        <Route
          path="/farmer-profile"
          element={
            isAuthenticatedFarmer(storedFarmer) ? (
              <FarmerProfile />
            ) : (
              <Navigate to="/farmer/login" replace />
            )
          }
        />
        <Route
          path="/farmer-market"
          element={
            isAuthenticatedFarmer(storedFarmer) ? (
              <FarmerMarket />
            ) : (
              <Navigate to="/farmer/login" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Hide footer on dashboards */}
      {!isFarmerDashboard && !isClientDashboard && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
