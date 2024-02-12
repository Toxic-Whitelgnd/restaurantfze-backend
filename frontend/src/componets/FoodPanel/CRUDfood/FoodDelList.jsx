import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <h1>Select the Food item to Delete</h1>
        <label>
                        Food Type:
                        <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                            <option value="" disabled>
                                Select Food Type to filter
                            </option>
                            {foodTypes.map((type) => (
                                <option key={type.food_name} value={type.food_name}>
                                    {type.food_name}
                                </option>
                            ))}
                        </select>
                    </label>
        <ul>
          {
              tables.filter(x => x.foodType === foodType).map(table => (
                  <li key={table.tableNo}>
                    <Link to={`/delete-fooddata/${table._id}`}>{`${table.foodName}`}</Link>
                  </li>
                ))
          }
        </ul>
        
      </div>
    );
}

export default FoodDelList;
