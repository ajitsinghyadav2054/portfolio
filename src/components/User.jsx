import React, { useState,useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    icon: "",
    iconBg: "#FFFFFF",
    date: "",
    points: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePointChange = (index, value) => {
    const updatedPoints = [...formData.points];
    updatedPoints[index] = value;
    setFormData((prev) => ({ ...prev, points: updatedPoints }));
  };

  const addPoint = () => {
    setFormData((prev) => ({ ...prev, points: [...prev.points, ""] }));
  };
 useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "user") {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      await axios.post(
        "http://localhost:3000/api/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      alert("Experience created!");
    } catch (error) {
      console.error("Error creating experience:", error);
      alert("Failed to create experience.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="icon"
          placeholder="Icon URL"
          value={formData.icon}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="iconBg"
          placeholder="Icon Background (e.g. #E6DEDD)"
          value={formData.iconBg}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="date"
          placeholder="Date (e.g. Jan 2021 - Feb 2022)"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="font-semibold">Points:</label>
          {formData.points.map((point, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Point ${index + 1}`}
              value={point}
              onChange={(e) => handlePointChange(index, e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
          ))}
          <button
            type="button"
            onClick={addPoint}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Point
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Experience
        </button>
      </form>
    </div>
  );
};

export default Admin;
