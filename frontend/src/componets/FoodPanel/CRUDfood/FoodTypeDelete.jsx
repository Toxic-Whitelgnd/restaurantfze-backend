// FoodTypeDeleteForm.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FoodTypeDelete.css';
const FoodTypeDelete = () => {
  const { foodid } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_food_type/${foodid}`);
      
      toast.success('Food type deleted successfully deleted!');
      // Optionally, you can add logic to handle success or navigate to another page
       // window.location.href = "/" // Redirect to the table list after deletion
       setTimeout(()=>{
        window.location.href = "/#/admin/foodpanel/"
      },2000)
    } catch (error) {
      console.error('Error deleting table:', error);
      toast.error('Error deleting table:');
    }
  };

  return (
    <div className="container mt-4">
      <div className='delete-food'>
      <div>
      <ToastContainer />
      <h1 id='delete-food-heading'>Delete Food </h1>
      </div>
      <div class='delete-food-body'>
      <p>Are you sure you want to delete this foodtype . The ?</p>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete Food
      </button>
      </div>
      </div>
    </div>
  );
};

export default FoodTypeDelete;
