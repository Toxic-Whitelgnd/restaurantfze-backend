// components/FoodEditForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavLink, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './FoodEdit.css';

const FoodEdit = () => {
    const { foodid } = useParams();

    const { register, handleSubmit, setValue } = useForm();
    const [foodData, setFoodData] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await axios.get(`https://restogenius.onrender.com/get_food_data_image/${foodid}`);
                setFoodData(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }

            console.log(foodData[0].foodName);

        };



        const fetchFoodTypes = async () => {
            try {
                const response = await axios.get('https://restogenius.onrender.com/get_food_type');
                setFoodTypes(response.data);
                
            } catch (error) {
                console.error('Error fetching food types:', error);
            }
        };

        fetchFoodData();
        fetchFoodTypes();
    }, []);

    const getFoodImg = () => {
        console.log("getting the image...");
        const base64String = foodData[0].foodImage;
        console.log(base64String);
        const binaryData = atob(base64String);

        // Calculate the size in bytes
        const sizeInBytes = binaryData.length;
        console.log(sizeInBytes);
        return sizeInBytes;

    }

    const handleImageChange = (e) => {
        setValue('foodImage', e.target.files[0]);
    };


    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            // console.log("from log data:" + data.foodImage[0].name, data.foodImage[0].size);


            formData.append('foodName', data.foodName);
            formData.append('foodPrice', data.foodPrice);
            // formData.append('foodImage', data.foodImage[0] === undefined ? getFoodImg() : data.foodImage[0]);
            formData.append('foodQty', data.foodQty);
            formData.append('foodAvailability', data.foodAvailability);
            formData.append('foodType', data.foodType);

            console.log("before passing" + formData.get('foodImage'));

            await axios.put(`https://restogenius.onrender.com/update_food_data/${foodid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Food data updated successfully!');
            setTimeout(()=>{
                window.location.href = "/#/admin/foodpanel/"
              },2000)
        } catch (error) {
            toast.error('Error updating food data:', error);
        }
    };

    return (
        <div class='FoodData'>
             <h1 className='FoodData-heading'>Edit The Food Items</h1>
            <ToastContainer />
            
            {foodData && foodData.map((food) => (
                <form key={food._id} onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('id')} value={food._id} />
                    <label class='FoodData-label-1'>
                        Food Name:
                        <input 
                         class='FoodData-input-1'
                        type="text" defaultValue={food.foodName} {...register('foodName')} />
                    </label>
                    <br></br>
                    <label  class='FoodData-label-1'>
                        Food Price:
                        <input 
                        class='FoodData-input-2'
                        type="text" defaultValue={food.foodPrice} {...register('foodPrice')} />
                    </label>
                    <br></br>
                    <label class='FoodData-label-1'>
                    
                        {food.foodImage && (
                            <div>
                                <p id='FoodData-label-1'>Food Image:</p>
                                <NavLink to={`/change-food-image/${food._id}`}className='FoodData-input-8'style={{ textDecoration: 'none' }}>Change Image</NavLink>
                            <br></br>
                                <img
                                    src={`data:image/jpeg;base64,${food.foodImage}`}
                                    alt="Food"
                                    style={{ maxWidth: '200px', marginTop: '12px' ,borderRadius:'20px'}}
                                />
                            </div>
                        )}
                       
                    </label>
                    <label class='FoodData-label-1'>
                        Food Quantity:
                        <input 
                         class='FoodData-input-3'
                        type="text" defaultValue={food.foodQty} {...register('foodQty')} />
                    </label>
                    <br></br>
                    <label class='FoodData-label-1'>
                        Food Availability:
                        <select className='FoodData-input-4'defaultValue={food.foodAvailability} {...register('foodAvailability')}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <br></br>
                    <label class='FoodData-label-1'>
                        Food Type:
                        <select className='FoodData-input-1' defaultValue={food.foodType} {...register('foodType')}>
                            <option value="" disabled>
                                Select Food Type
                            </option>
                            {foodTypes.map((type) => (
                                <option key={type.food_name} value={type.food_name}>
                                    {type.food_name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button className='Food-submit' type="submit">Update</button>
                </form>
            ))}
        </div>
    );
};

export default FoodEdit;
