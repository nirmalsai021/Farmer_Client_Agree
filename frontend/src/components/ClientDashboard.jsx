import React, { useEffect, useState } from "react";

const ClientDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get all products currently in the market (not deleted by farmers)
    const storedProducts = JSON.parse(localStorage.getItem("farmerProducts")) || [];
    setProducts(storedProducts); // Show all available, regardless of owner
  }, []);

  if (products.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No products available in the market right now.</h2>
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
          gridTemplateColumns: "repeat(5, 1fr)", // 5 cards in each row
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
              width: "220px",
            }}
          >
            <img
              src={
                product.photo ||
                "https://via.placeholder.com/220x160.png?text=No+Image"
              }
              alt={product.product || "Product Image"}
              style={{
                width: "200px",
                height: "160px",
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
          </article>
        ))}
      </section>
    </div>
  );
};

export default ClientDashboard;
