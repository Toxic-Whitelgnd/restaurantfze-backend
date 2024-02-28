import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DeleteMessDetails = () => {
  const { messid } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_messDetails/${messid}`);
      
      toast.success('Mess Details deleted successfully!');
      // Optionally, you can add logic to handle success or navigate to another page
        //window.location.href = "/" // Redirect to the table list after deletion
    } catch (error) {
      toast.error('Error deleting table:', error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h1>Delete Mess Details </h1>
      <p>Are you sure you want to delete this Mess Detail?</p>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteMessDetails;
