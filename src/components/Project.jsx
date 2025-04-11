import React, { useState, useEffect } from "react";
import axios from "axios";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    tags: [{ name: "", color: "" }],
    image: "",
    source_code_link: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/projects");
      setProjects(res.data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (index, field, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index][field] = value;
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, { name: "", color: "" }],
    }));
  };

  const handleEdit = (project) => {
    setFormData(project);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3000/api/project/delete",
        { _id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Project deleted!");
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = isEditing
      ? "http://localhost:3000/api/project/edit"
      : "http://localhost:3000/api/project/create";

    try {
      const payload = { ...formData };
      if (!isEditing) delete payload._id;

      await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(isEditing ? "Project updated!" : "Project created!");
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    }
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      name: "",
      description: "",
      tags: [{ name: "", color: "" }],
      image: "",
      source_code_link: "",
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Project" : "Add Project"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="font-semibold">Tags:</label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                placeholder="Tag name"
                value={tag.name}
                onChange={(e) => handleTagChange(index, "name", e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <input
                placeholder="Color class"
                value={tag.color}
                onChange={(e) =>
                  handleTagChange(index, "color", e.target.value)
                }
                className="flex-1 border p-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTag}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Tag
          </button>
        </div>

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="source_code_link"
          placeholder="Source Code URL"
          value={formData.source_code_link}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className={`${
            isEditing ? "bg-yellow-500" : "bg-green-600"
          } text-white px-4 py-2 rounded`}
        >
          {isEditing ? "Update Project" : "Create Project"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4">All Projects</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((proj, index) => (
          <div key={index} className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{proj.name}</h3>
            <p className="text-sm">{proj.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {proj.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded ${tag.color}`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
            <a
              href={proj.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-600 underline"
            >
              Source Code
            </a>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(proj)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(proj._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
