// components/ChangeFoodAvilForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { NavLink, useParams } from 'react-router-dom';

const ChangeFoodAvil = () => {
    const { foodid } = useParams();

    const { register, handleSubmit, setValue } = useForm();
    const [foodData, setFoodData] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/get_food_data_image/${foodid}`);
                setFoodData(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }

            console.log(foodData[0].foodName);

        };



        const fetchFoodTypes = async () => {
            try {
                const response = await axios.get('http://localhost:9999/get_food_type');
                setFoodTypes(response.data);
            } catch (error) {
                console.error('Error fetching food types:', error);
            }
        };

        fetchFoodData();
        fetchFoodTypes();
    }, []);


    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            // console.log("from log data:" + data.foodImage[0].name, data.foodImage[0].size);


            formData.append('foodName', data.foodName);
            formData.append('foodPrice', data.foodPrice);
            // formData.append('foodImage', data.foodImage[0] === undefined ? getFoodImg() : data.foodImage[0]);
            
            formData.append('foodAvailability', data.foodAvailability);
       

            console.log("before passing" + formData.get('foodImage'));

            await axios.put(`http://localhost:9999/update_food_data/${foodid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Food data updated successfully!');
        } catch (error) {
            alert('Error updating food data:', error);
        }
    };

    return (
        <div>
            {foodData && foodData.map((food) => (
                <form key={food._id} onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('id')} value={food._id} />
                    <label>
                        Food Name:
                        <input type="text" defaultValue={food.foodName} {...register('foodName')} />
                    </label>
                    <br></br>
                    <label>
                        Food Price:
                        <input type="text" defaultValue={food.foodPrice} {...register('foodPrice')} />
                    </label>
                    <br></br>
                    
                    <label>
                        Food Availability:
                        <select defaultValue={food.foodAvailability} {...register('foodAvailability')}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <br></br>
                    
                    <button type="submit">Update</button>
                </form>
            ))}
        </div>
    );
};

export default ChangeFoodAvil;
