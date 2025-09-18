import React, { useState } from "react";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    id: null, // will be set automatically
    name: "",
    contact: "",
    product: "",
    quantity: "",
    location: "",
    deadline: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields (simple example)
    if (!formData.name || !formData.product) {
      alert("Please fill in at least your name and product.");
      return;
    }

    // Create new product with unique id
    const newProduct = {
      ...formData,
      id: Date.now(), // unique ID based on timestamp
    };

    // Get existing products from localStorage or empty array
    const existingProducts = JSON.parse(localStorage.getItem("farmerProducts")) || [];

    // Add new product
    existingProducts.push(newProduct);

    // Save updated products array back to localStorage
    localStorage.setItem("farmerProducts", JSON.stringify(existingProducts));

    alert("Product added to market successfully!");

    // Reset form
    setFormData({
      id: null,
      name: "",
      contact: "",
      product: "",
      quantity: "",
      location: "",
      deadline: "",
      photo: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Add Product to Market</h2>

      <label>
        Farmer Name*:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>

      <label>
        Contact:
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label>
        Product*:
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </label>

      <label>
        Quantity (kg):
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label>
        Deadline:
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      <label>
        Photo URL:
        <input
          type="url"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          style={inputStyle}
        />
      </label>

      <button type="submit" style={buttonStyle}>
        Add to Market
      </button>
    </form>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "6px 0 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#2d6a4f",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AddProductForm;
