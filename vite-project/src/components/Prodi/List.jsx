// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function List() {
  const [prodi, setprodi] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
      .then((response) => {
        console.log(response.data.result);
        setprodi(response.data.result);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }, []);
  const handleDelete = (id, nama) => {
    // eslint-disable-next-line no-undef
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Prodi: ${nama}`,
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
            setprodi(prodi.filter((f) => f.id !== id));
            // Tampilkan notifikasi sukses
            // eslint-disable-next-line no-undef
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            // eslint-disable-next-line no-undef
            Swal.fire("Error", "There was an issue deleting the data.", "error");
          });
      }
    });
  };
  
  return (
    <>
      <h1>List Prodi</h1>

      <NavLink to="/prodi/create" className="btn btn-primary">
        Create
      </NavLink>

      <table className="table">
        <thead>
          <tr>
            <th>Nama Prodi</th>
            <th>Nama Fakultas</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {prodi.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
              <td>{data.fakultas.nama}</td>
              <td>
                <NavLink to={`/prodi/edit/${data.id}`} className="btn btn-warning">
                  Edit
                </NavLink>
                <button 
          // eslint-disable-next-line no-undef
          onClick={() => handleDelete(f.id, f.nama)} 
          className="btn btn-danger"
        >
          Delete
        </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
