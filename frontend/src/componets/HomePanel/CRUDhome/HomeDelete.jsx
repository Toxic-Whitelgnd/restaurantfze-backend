// HomeDeleteForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HomeDelete = () => {
  const { homeno } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`http://localhost:9999/delete_home_page_data/${homeno}`);
      
      alert('Home item deleted successfully deleted!');

      window.location.href = "/"

    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Delete Table {homeno}</h1>
      <p>Are you sure you want to delete Home page (might leads to error)?</p>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete Home Page
      </button>
    </div>
  );
};

export default HomeDelete;
