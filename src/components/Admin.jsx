import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExperienceAdmin from "./ExperienceAdmin";
import Project from "./Project";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ExperienceAdmin />
      <hr className="my-10" />
      <Project />
    </div>
  );
};

export default Admin;
