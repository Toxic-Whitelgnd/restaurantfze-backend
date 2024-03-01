// FoodType.js

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
    <div>
      <ToastContainer />
        <h1>Add the food type</h1>
    
    <form onSubmit={handleSubmit}>
      <label>
        Food Type:
        <input
          type="text"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add</button>
    </form>
    </div>
  );
};

export default FoodType;
