// TableDeleteForm.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

const TableDelete = () => {
  const { tableno } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_table_data/${tableno}`);
      console.log('Table successfully deleted!');
      // Optionally, you can add logic to handle success or navigate to another page
        window.location.href = "/" // Redirect to the table list after deletion
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Delete Table {tableno}</h1>
      <p>Are you sure you want to delete Table {tableno}?</p>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete Table
      </button>
    </div>
  );
};

export default TableDelete;
