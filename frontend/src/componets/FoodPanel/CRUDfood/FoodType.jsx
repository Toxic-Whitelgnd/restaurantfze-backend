// FoodType.js

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './FoodType.css';

const FoodType = () => {
  const [foodType, setFoodType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(foodType);

    try {
      const response = await axios.post('https://restogenius.onrender.com/post_food_type', {foodType : foodType });


      toast.success(`${foodType} added successfully!`)
      setTimeout(()=>{
        window.location.href = "/#/admin/foodpanel/"
      },2000)
      setFoodType('');
    } catch (error) {
      console.error('Error:', error);
      toast.error("error while adding food type")
    }
  };

  return (
    <div className='add-food-type-body'>
      <ToastContainer />
        <h1 id='add-food-type-heading'>Add The Food Type</h1>
    
    <form onSubmit={handleSubmit}>
      <label className='add-food-type'>
        Food Type:
        <input
          type="text"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          required
        />
      </label>
      <button class='add-food-type-submit' 
      type="submit">Add</button>
    </form>
    </div>
  );
};

export default FoodType;
