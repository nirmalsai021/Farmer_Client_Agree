import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    product: "",
    quantity: "",
    location: "",
    deadline: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [currentFarmerId, setCurrentFarmerId] = useState(null);

  useEffect(() => {
    const storedFarmer = localStorage.getItem("farmer");
    if (!storedFarmer) {
      navigate("/farmer/login");
      return;
    }

    try {
      const farmerData = JSON.parse(storedFarmer);
      setCurrentFarmerId(farmerData.email || farmerData.username || null);
      setFormData((prev) => ({
        ...prev,
        name: farmerData.name || farmerData.username || "",
        contact: farmerData.contact || "",
      }));
    } catch (err) {
      console.error("Error parsing farmer data:", err);
      localStorage.removeItem("farmer");
      navigate("/farmer/login");
      return;
    }

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const deadlineDate = new Date(formData.deadline);
    if (!formData.deadline || deadlineDate <= now) {
      alert("❌ Deadline must be a future date and time!");
      return;
    }

    const productToSave = {
      id: Date.now(),
      owner: currentFarmerId,
      name: formData.name,
      contact: formData.contact,
      product: formData.product,
      quantity: formData.quantity,
      location: formData.location,
      deadline: formData.deadline,
      photo: null,
    };

    const saveProduct = (photoDataUrl) => {
      productToSave.photo = photoDataUrl || null;
      const existingProducts =
        JSON.parse(localStorage.getItem("farmerProducts")) || [];
      existingProducts.push(productToSave);
      localStorage.setItem("farmerProducts", JSON.stringify(existingProducts));

      alert("✅ Details added to market successfully!");

      setFormData((prev) => ({
        ...prev,
        product: "",
        quantity: "",
        location: "",
        deadline: "",
        photo: null,
      }));
      setPreview(null);
    };

    if (formData.photo && typeof formData.photo !== "string") {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveProduct(reader.result);
      };
      reader.readAsDataURL(formData.photo);
    } else {
      saveProduct(formData.photo);
    }
  };

  return (
    <div className="farmer-dashboard-container">
      <h2>🌾 Farmer Dashboard</h2>

      <form onSubmit={handleSubmit} style={{ clear: "both" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Farmer Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled // unchangeable name
        />

        <label>Photo:</label>
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />

        {preview && (
          <div className="image-preview">
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
        )}

        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          placeholder="Contact Details"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label>Product Name:</label>
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={formData.product}
          onChange={handleChange}
          required
        />

        <label>Quantity (kg):</label>
        <input
          type="number"
          name="quantity"
          placeholder="Product Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          min={1}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Deadline:</label>
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "15px" }}>
          Add To Market
        </button>
      </form>
    </div>
  );
};

export default FarmerDashboard;
