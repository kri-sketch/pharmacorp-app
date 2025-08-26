import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlantContext, Plant } from "./PlantContext";

const EditPlantMaster: React.FC = () => {
  const { id } = useParams(); // index from route
  const plantCtx = useContext(PlantContext);
  const navigate = useNavigate();

const index = id ? parseInt(id, 10) : -1;
  const plant = plantCtx?.plants[index];
  const [form, setForm] = useState<Plant>(plant ?? {
    name: "",
    description: "",
    location: "",
    status: "ACTIVE",
  });

  if (!plantCtx || id === undefined || !plant) return null;
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: name === "status" ? (value as "ACTIVE" | "INACTIVE") : value,
  });
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    plantCtx.updatePlant(index, form);
    navigate("/superadmin");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Plant</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
        <input name="name" placeholder="Plant Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/plants")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPlantMaster; 