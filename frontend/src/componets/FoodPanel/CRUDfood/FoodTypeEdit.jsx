import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const FoodTypeEdit = () => {
   

  const [foodName, setFoodName] = useState(null);
    const {foodid} = useParams();
  useEffect(() => {
    // Fetch food type details when the component mounts
    const fetchFoodType = async () => {
      try {
        const response = await axios.get(`https://restogenius.onrender.com/get_singlefood_type/${foodid}`);
        // Assuming the response.data contains the details of the food type
        console.log(response.data);
        setFoodName(response.data[0]);
      } catch (error) {
        console.error('Error fetching food type details:', error);
      }
    };

    fetchFoodType();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleUpdate = async () => {
    console.log(foodName);
    try {
      const response = await axios.put(`https://restogenius.onrender.com/update_food_type/${foodid}`, {
        food_name: foodName
      });

      console.log('Food type updated successfully:', response.data);
      toast.success("Updated food type ")
    } catch (error) {
      console.error('Error updating food type:', error);
      toast.error("Error updating food type:");
    }
  };
    return (
        <div>
          <ToastContainer />
            {foodName && foodName ? (
        <>
          <h3>Current Food Type Details:</h3>
          <label>
            Food Name:
            <input
              type="text"
              value={foodName.food_name}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </label>
          <button onClick={handleUpdate}>Update Food Type</button>
        </>
      ) : (
        <p>Loading food type details...</p>
      )}
        </div>
    );
}

export default FoodTypeEdit;
