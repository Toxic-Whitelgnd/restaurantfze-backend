import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const FoodData = () => {

    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodImage, setFoodImage] = useState(null);
    const [foodQty, setFoodQty] = useState('');
    const [foodAvailability, setFoodAvailability] = useState('');
    const [foodType, setFoodType] = useState('');
    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {
        // Fetch food types from the server
        const fetchFoodTypes = async () => {
            try {
                const response = await axios.get('https://restogenius.onrender.com/get_food_type');
                setFoodTypes(response.data);
            } catch (error) {
                console.error('Error fetching food types:', error);
            }
        };

        fetchFoodTypes();
    }, []); // Empty dependency array to run the effect only once

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // if (file) {
        //     const reader = new FileReader();

        //     reader.onloadend = () => {
        //         // console.log(reader.result);
        //         setFoodImage(reader.result);
        //     };

        //     reader.readAsDataURL(file);
        // }
        console.log(file);
        setFoodImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = {
            foodName: foodName,
            foodPrice: foodPrice,
            foodImage: foodImage,
            foodQty: foodQty,
            foodAvailability: foodAvailability,
            foodType: foodType,
        }

        try {
            const response = await axios.post('https://restogenius.onrender.com/post_add_food_data', {
                foodName,
                foodPrice,
                foodImage,
                foodQty,
                foodAvailability,
                foodType,
              },{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

            if (response.status === 201) {
                console.log('Food data added successfully!');
                toast.success('Food data added successfully!');
                // You can also redirect or perform any other action upon success
              //  window.location.reload();
            } else {
                toast.error('Failed to add food data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h1>Add the food items</h1>
            <ToastContainer />
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Food Name:
                        <input
                           class='FoodData-input-1'
                            type="text"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label  class='FoodData-label-1'>
                        Food Price:
                        <input
                            class='FoodData-input-2'
                            type="text"
                            value={foodPrice}
                            onChange={(e) => setFoodPrice(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label  class='FoodData-label-1'>
                        Food Image:
                        <input
                            class='FoodData-input-1'
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {foodImage && <img src={URL.createObjectURL(foodImage)}alt="Food Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        {/* {foodImage && <img src={foodImage} alt="Food Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />} */}
                    </label>
                    <br></br>
                    <label  class='FoodData-label-1'>
                        Food Quantity:
                        <input
                            class='FoodData-input-3'
                            type="text"
                            value={foodQty}
                            onChange={(e) => setFoodQty(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label  class='FoodData-label-1'>
                        Food Availability:
                        <select value={foodAvailability} className='FoodData-input-4'onChange={(e) => setFoodAvailability(e.target.value)}>
                            <option value="" disabled>
                                Select Availability
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <br></br>
                    <label  class='FoodData-label-1'>
                        Food Type:
                        <select value={foodType} className='FoodData-input-1' onChange={(e) => setFoodType(e.target.value)}>
                            <option value="" disabled>
                                Select Food Type
                            </option>
                            {foodTypes.map((type) => (
                                <option key={type.food_name} value={type.food_name}>
                                    {type.food_name}
                                </option>
                            ))}
                        </select>
                    </label><ToastContainer/>
                    <button className='Food-submit' type="submit">Add Food</button>
                </form>
            </div>
        </div>
    );
}

export default FoodData;


// when retriveing

{/* 
// routes/foodRoutes.js
const express = require('express');
const Food = require('../models/Food');

const router = express.Router();

router.get('/admin/get_food_data_with_images', async (req, res) => {
  try {
    const foodData = await Food.find();
    const foodDataWithBase64Images = foodData.map(item => ({
      ...item.toObject(),
      foodImage: item.foodImage.toString('base64'),
    }));
    res.json(foodDataWithBase64Images);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;


// components/FoodList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get('/admin/get_food_data_with_images');
        setFoodData(response.data);
      } catch (error) {
        console.error('Error fetching food data with images:', error);
      }
    };

    fetchFoodData();
  }, []);

  return (
    <div>
      <h2>Food List</h2>
      {foodData.map((food) => (
        <div key={food._id}>
          <p>Food Name: {food.foodName}</p>
          <p>Food Price: {food.foodPrice}</p>
          <p>Food Availability: {food.foodAvailability}</p>
          {food.foodImage && (
            <div>
              <p>Food Image:</p>
              <img
                src={`data:image/jpeg;base64,${food.foodImage}`}
                alt="Food"
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            </div>
          )}
         
          </div>
          ))}
        </div>
      );
    };
    
    export default FoodList;
    
*/}
