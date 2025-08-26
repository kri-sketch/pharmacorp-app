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
    <div  style={{
        maxWidth: 440,
        margin: "30px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 0 16px rgba(40,70,120,.09)",
      }}>
      <h2 style={{ marginBottom: 24 }}>Add Plant</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
       

        <div className={styles.formGroup}>
                  <label>Plant Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
        


        <div className={styles.formGroup}>
                  <label>Description</label>
                  <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div> 


        

        <div className={styles.formGroup}>
                  <label>Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                  />
                </div> 

        <select
          className={styles.select}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE" >INACTIVE</option>
        </select>
        <div className={styles.buttonRow}>
          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate("/superadmin")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlantMaster;
