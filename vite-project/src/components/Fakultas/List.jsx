// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import Swal from "sweetalert2";


export default function List() {
  const [fakultas, setfakultas] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")
      .then((response) => {
        console.log(response.data.result);
        setfakultas(response.data.result);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }, []);
  // Fungsi untuk menghapus fakultas berdasarkan ID dengan konfirmasi SweetAlert2
const handleDelete = (id, nama) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You won't be able to revert this! Fakultas: ${nama}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      // Lakukan penghapusan jika dikonfirmasi
      axios
        .delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
        // eslint-disable-next-line no-unused-vars
        .then((_response) => {
          // Hapus fakultas dari state setelah sukses dihapus dari server
          setfakultas(fakultas.filter((f) => f.id !== id));
          // Tampilkan notifikasi sukses
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
        })
        .catch((error) => {
          console.error("Error deleting data:", error); // Menangani error
          Swal.fire("Error", "There was an issue deleting the data.", "error");
        });
    }
  });
};
  return (
    <>
      <h1>List Fakultas</h1>

      <NavLink to="/fakultas/create" className="btn btn-primary">
        Create
      </NavLink>
      <ul className="list-group">
  {fakultas.map((f) => (
    <li 
      key={f.id} 
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span>{f.nama}</span> {/* Menampilkan nama fakultas */}
      <div className="btn-group" role="group" aria-label="Action buttons">
        <NavLink 
          to={`/fakultas/edit/${f.id}`} 
          className="btn btn-warning"
        >
          Edit
        </NavLink>
        <button 
          // eslint-disable-next-line no-undef
          onClick={() => handleDelete(f.id, f.nama)} 
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>
      <div className="card m-5">
        <ul className="list-group "></ul>
      </div>
    </>
    
  );
}
