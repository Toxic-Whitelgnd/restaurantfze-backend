// TableDeleteForm.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './TableDelete.css';

const TableDelete = () => {
  const { tableno } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_table_data/${tableno}`);
      console.log('Table successfully deleted!');
      toast.success('Table successfully deleted!');
      // Optionally, you can add logic to handle success or navigate to another page
        //window.location.href = "/" // Redirect to the table list after deletion
    } catch (error) {
      console.error('Error deleting table:', error);
      toast.error('Error deleting table');
    }
  };

  return (
    <div className="container mt-4">
      <div className='Table-delete'>
      <ToastContainer />
      <h1 id='table-delete-heading'>Delete Table {tableno}</h1>
      
      <div className='table-delete-page'>
      <p>Are you sure you want to delete Table {tableno}?</p>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete Table
      </button>
      </div>
    </div>
    </div>
  );
};

export default TableDelete;
