// HomeDeleteForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify';
import './HomeDelete.css';
=======
import { toast } from 'react-toastify';

>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
const HomeDelete = () => {
  const { homeno } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_home_page_data/${homeno}`);
<<<<<<< HEAD
      toast.success("Home item deleted successfully deleted!");
    
=======
      
      toast.success('Home item deleted successfully deleted!');
>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6

      window.location.href = "/"

    } catch (error) {
      toast.error('Error deleting table:', error);
    }
  };

  return (
    <div className="container mt-4">
<<<<<<< HEAD
      <div className='home-delete-table'>
      <div className='home-delete-table-heading'>
=======
      <ToastContainer />
>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
      <h1>Delete Table {homeno}</h1>
      </div>
      <div className='home-delete-table-page'>
      <p>Are you sure you want to delete Home page (might leads to error)?</p><ToastContainer/>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete Home Page
      </button>
      </div>
      </div>
    </div>
  );
};

export default HomeDelete;
