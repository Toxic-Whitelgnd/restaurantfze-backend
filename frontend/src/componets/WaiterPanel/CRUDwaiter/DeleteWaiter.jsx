// DeleteWaiterForm.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './DeleteWaiter.css';
const DeleteWaiter = () => {
  const { waiterid } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_waiter/${waiterid}`);
      
      toast.success('Waiter removed successfully!');
      // Optionally, you can add logic to handle success or navigate to another page
       // window.location.href = "/" // Redirect to the table list after deletion
    } catch (error) {
      toast.error('Error deleting table:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className='DeleteWaiter-food'>
      <div>
      <ToastContainer />
      <h1 id='DeleteWaiter-food-heading'>Delete Waiter </h1>
      </div>
      <div class='DeleteWaiter-food-body'>
      <p>Are you sure you want to Remove this waiter?</p>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Fire off
      </button>
    </div>
    </div>
    </div>
  );
};

export default DeleteWaiter;
