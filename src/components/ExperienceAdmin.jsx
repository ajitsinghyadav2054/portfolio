// Manages create/edit for Experience data

import React, { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    company_name: "",
    icon: "",
    iconBg: "#FFFFFF",
    date: "",
    points: [""],
  });

  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getexperience");
      setExperiences(res.data.data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
  };

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

  const handleEdit = (exp) => {
    setFormData({ ...exp });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = isEditing
        ? "http://localhost:3000/api/editexperience"
        : "http://localhost:3000/api/create";

      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(isEditing ? "Experience updated!" : "Experience created!");
      resetForm();
      fetchExperiences();
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("Failed to save experience.");
    }
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      title: "",
      company_name: "",
      icon: "",
      iconBg: "#FFFFFF",
      date: "",
      points: [""],
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Experience" : "Create Experience"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="icon" placeholder="Icon URL" value={formData.icon} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="iconBg" placeholder="Icon Background" value={formData.iconBg} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="date" placeholder="Date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" />

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
          <button type="button" onClick={addPoint} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
            Add Point
          </button>
        </div>

        <button type="submit" className={`${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded`}>
          {isEditing ? "Submit Changes" : "Create Experience"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4">All Experiences</h2>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={exp._id || index} className="border p-4 rounded bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold">{exp.title} @ {exp.company_name}</h3>
            <p className="text-sm text-gray-500">{exp.date}</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              {exp.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <button onClick={() => handleEdit(exp)} className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
