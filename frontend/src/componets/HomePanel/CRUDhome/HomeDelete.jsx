import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './HomeDelete.css';

const HomeDelete = () => {
  const { homeno } = useParams();

  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_home_page_data/${homeno}`);
      
      toast.success('Home item deleted successfully deleted!');
      
      window.location.href = '/';
    } catch (error) {
      toast.error('Error deleting table:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className='home-delete-table'>
        <div className='home-delete-table-heading'>
          <ToastContainer />
          <h1>Delete Table {homeno}</h1>
        </div>
        <div className='home-delete-table-page'>
          <p>Are you sure you want to delete Home page (might leads to error)?</p>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDelete;
