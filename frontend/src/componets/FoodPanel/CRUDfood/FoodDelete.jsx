// FoodDeleteForm.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
<<<<<<< HEAD
import './FoodDelete.css';
=======

>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
const FoodDelete = () => {
  const { foodid } = useParams();


  const handleDelete = async () => {
    try {
      // Make a DELETE request to /delete_table_data/:table_no
      await axios.delete(`https://restogenius.onrender.com/delete_food_data/${foodid}`);
<<<<<<< HEAD
      toast.success("Food item deleted successfully deleted!");
    
=======
      
      toast.success('Food item deleted successfully deleted!');
>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
      // Optionally, you can add logic to handle success or navigate to another page
       // window.location.href = "/" // Redirect to the table list after deletion
    } catch (error) {
      console.error('Error deleting table:', error);
      toast.error("Error deleting food");
    }
  };

  return (
    <div className="container mt-4">
<<<<<<< HEAD
      <div class='delete-food'>
      <div class='delete-food-heading'>
=======
      <ToastContainer />
>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
      <h1>Delete Food </h1>
      </div>
      <div class='delete-food-body'>
      <p>Are you sure you want to delete this food?</p>
      <ToastContainer/>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete Food
      </button>
      </div>
      </div>
    </div>
  );
};

export default FoodDelete;
