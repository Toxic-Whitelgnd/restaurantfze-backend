import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './FoodDelList.css';

const FoodDelList = () => {
    const [tables, setTables] = useState([]);

    const [foodType, setFoodType] = useState('');
    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
          try {
            const response = await axios.get('https://restogenius.onrender.com/get_food_data');
            setTables(response.data);
          } catch (error) {
            console.error('Error fetching tables:', error);
          }
        };

        const fetchFoodTypes = async () => {
            try {
                const response = await axios.get('https://restogenius.onrender.com/get_food_type');
                setFoodTypes(response.data);
            } catch (error) {
                console.error('Error fetching food types:', error);
            }
        };

        fetchFoodTypes();
    
        fetchTables();
      }, []);
    return (
        <div className="container mt-4">
        <div class='food-del-list'>
        <div class='food-del-list-heading'>
        <h1>Select The Food Item To Delete</h1>
        </div>
        <label class='food-del-list-label'>
                        Food Type:
                        <select value={foodType} className='food-del-list-select' onChange={(e) => setFoodType(e.target.value)}>
                            <option value="" disabled>
                                Select Food Type To Filter
                            </option>
                            {foodTypes.map((type) => (
                                <option key={type.food_name} value={type.food_name}>
                                    {type.food_name}
                                </option>
                            ))}
                        </select>
                    </label>
                   
        <ul className='food-del-list-ui'>
          {
              tables.filter(x => x.foodType === foodType).map(table => (
                  <li key={table.tableNo}>
                    <Link to={`/admin/delete-fooddata/${table._id}`}>{`${table.foodName}`}</Link>
                  </li>
                ))
          }  
          
        </ul>
        </div>
      </div>
    );
}

export default FoodDelList;
