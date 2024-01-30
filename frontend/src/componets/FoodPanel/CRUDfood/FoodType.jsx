// FoodType.js

import React, { useState } from 'react';
import axios from 'axios';

const FoodType = () => {
  const [foodType, setFoodType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(foodType);

    try {
      const response = await axios.post('http://localhost:9999/post_food_type', {foodType : foodType });

      alert(`${foodType} added successfully!`);
      setFoodType('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <h1>Add the food type</h1>
    
    <form onSubmit={handleSubmit}>
      <label>
        Food Type:
        <input
          type="text"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
    </div>
  );
};

export default FoodType;
