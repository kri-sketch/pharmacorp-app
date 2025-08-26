import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlantContext, Plant } from "./PlantContext";
import styles from "./AddPlantMaster.module.css";


const AddPlantMaster: React.FC = () => {
  const { addPlant } = usePlantContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<Plant>({
    name: "",
    description: "",
    location: "",
    status: "ACTIVE",
  });

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
    addPlant(form);
    navigate("/superadmin"); // redirect to table
  };

  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: 24 }}>Add Plant</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="name"
          placeholder="Plant Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <select
          className={styles.select}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE" className={styles.statusInactive}>INACTIVE</option>
        </select>
        <div className={styles.buttonRow}>
          <button type="submit" className={styles.saveBtn}>Save</button>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate("/plants")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddPlantMaster;
