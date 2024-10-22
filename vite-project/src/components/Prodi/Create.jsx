// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateProdi() {
  const [namaProdi, setNamaProdi] = useState("");
  const [fakultasId, setFakultasId] = useState("");
  const [fakultasList, setFakultasList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchFakultas = async () => {
      try {
        const response = await axios.get(
          "https://project-apiif-3-b.vercel.app/api/api/fakultas"
        );
        setFakultasList(response.data.result);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to fetch fakultas data");
      }
    };

    fetchFakultas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaProdi.trim() === "" || fakultasId.trim() === "") {
      setError("Nama Prodi and Fakultas are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://project-apiif-3-b.vercel.app/api/api/prodi",
        {
          nama: namaProdi,
          fakultas_id: fakultasId,
        }
      );
      if (response.status === 201) {
        setSuccess("Prodi created successfully!");
        setNamaProdi("");
        setFakultasId("");
      } else {
        setError("Failed to create prodi");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("An error occurred while creating prodi");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Prodi</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Prodi</label>
          <input
            type="text"
            className="form-control"
            value={namaProdi}
            onChange={(e) => setNamaProdi(e.target.value)}
            placeholder="Enter Prodi Name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fakultas</label>
          <select
            className="form-select"
            value={fakultasId}
            onChange={(e) => setFakultasId(e.target.value)}
          >
            <option value="">Select Fakultas</option>
            {fakultasList.map((fakultas) => (
              <option key={fakultas.id} value={fakultas.id}>
                {fakultas.nama}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}