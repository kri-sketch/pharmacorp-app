import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlantContext, Plant } from "./PlantContext";
import styles from "./AddPlantMaster.module.css";
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
    <div  style={{
        maxWidth: 440,
        margin: "30px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 0 16px rgba(40,70,120,.09)",
      }}>
      <h2 style={{ marginBottom: 20, color: "#2563eb" }}>Edit Plant</h2>
      <form   onSubmit={handleSubmit} className={styles.form}>
        <div >
          <label>Plant Name</label>
          <input
            name="name"
            value={form.name}
           onChange={handleChange}
            
            required
          />
        </div>
         <div >
          <label>Description</label>
          <input
            name="description"
            value={form.description}
           onChange={handleChange}
            
            required
          />
        </div>
       
         <div >
          <label>Location</label>
          <input
            name="location"
            value={form.location}
           onChange={handleChange}
            
            required
          />
        </div>
        <div>
          <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        </div>
        <div className={styles.buttonRow}>
        <button type="submit" className={styles.saveBtn}>Update</button>
        <button type="button"  className={styles.cancelBtn} onClick={() => navigate("/plants")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPlantMaster; 