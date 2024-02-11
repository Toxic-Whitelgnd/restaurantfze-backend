// DeleteWaiterForm.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

const DeleteWaiter = () => {
  const { waiterid } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_waiter/${waiterid}`);
      
      alert('Waiter removed successfully!');
      // Optionally, you can add logic to handle success or navigate to another page
        window.location.href = "/" // Redirect to the table list after deletion
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Delete Food </h1>
      <p>Are you sure you want to Remove this waiter?</p>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Fire off
      </button>
    </div>
  );
};

export default DeleteWaiter;
