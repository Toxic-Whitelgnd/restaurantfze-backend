import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FoodTypeDelList = () => {
    const [tables, setTables] = useState([]);



    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('https://restogenius.onrender.com/get_food_type');
                setTables(response.data);
            } catch (error) {
                console.error('Error fetching food types:', error);
            }
        };

    
        fetchTables();
      }, []);
    return (
        <div className="container mt-4">
        <h1>Select the TYPE to delete</h1>
        <ul>
          {
              tables.map(table => (
                  <li key={table._id}>
                    <Link to={`/delete-foodtype/${table._id}`}>{`${table.food_name}`}</Link>
                  </li>
                ))
          }
        </ul>
        
      </div>
    );
}

export default FoodTypeDelList;
