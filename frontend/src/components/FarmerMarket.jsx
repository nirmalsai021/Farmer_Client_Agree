import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FarmerMarket = () => {
  const [products, setProducts] = useState([]);
  const [currentFarmerId, setCurrentFarmerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFarmer = localStorage.getItem("farmer");
    if (!storedFarmer) {
      navigate("/farmer/login");
      return;
    }
    const farmerData = JSON.parse(storedFarmer);
    const farmerId = farmerData.email || farmerData.username;
    setCurrentFarmerId(farmerId);

    const storedProducts = JSON.parse(localStorage.getItem("farmerProducts")) || [];

    // Filter products owned by current farmer only
    const filteredProducts = storedProducts.filter(
      (product) => product.owner === farmerId
    );

    setProducts(filteredProducts);
  }, [navigate]);

  const removeProduct = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("farmerProducts")) || [];
    const updatedProducts = storedProducts.filter(
      (product) => !(product.id === id && product.owner === currentFarmerId)
    );

    localStorage.setItem("farmerProducts", JSON.stringify(updatedProducts));

    // Update displayed products
    setProducts(updatedProducts.filter((p) => p.owner === currentFarmerId));
  };

  if (products.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No products added to market yet.</h2>
        <button onClick={() => navigate("/farmer-dashboard")} style={buttonStyle}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "100%",
        margin: "2rem auto",
        height: "75vh",
        overflowY: "auto",
        padding: "1rem",
        backgroundColor: "#f9fafa",
        boxSizing: "border-box",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          justifyItems: "center",
        }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            style={{
              backgroundColor: "#f0f8f5",
              borderRadius: "10px",
              padding: "1rem 1.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              color: "#1b4332",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxSizing: "border-box",
              width: "280px",
            }}
          >
            <img
              src={
                product.photo ||
                "https://via.placeholder.com/280x180.png?text=No+Image"
              }
              alt={product.product || "Product Image"}
              style={{
                width: "250px",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
                display: "block",
              }}
            />

            <p>
              <strong>Farmer Name:</strong> {product.name || "N/A"}
            </p>
            <p>
              <strong>Contact:</strong> {product.contact || "N/A"}
            </p>
            <p>
              <strong>Product:</strong> {product.product || "N/A"}
            </p>
            <p>
              <strong>Quantity (kg):</strong> {product.quantity || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {product.location || "N/A"}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {product.deadline
                ? new Date(product.deadline).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A"}
            </p>

            <button
              onClick={() => removeProduct(product.id)}
              style={{ ...buttonStyle, marginTop: "1rem", backgroundColor: "#d00000" }}
              title="Remove product from market"
            >
              Remove from Market
            </button>
          </article>
        ))}
      </section>
    </div>
  );
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "10px 20px",
  cursor: "pointer",
  backgroundColor: "#2d6a4f",
  color: "white",
  border: "none",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
};

export default FarmerMarket;
