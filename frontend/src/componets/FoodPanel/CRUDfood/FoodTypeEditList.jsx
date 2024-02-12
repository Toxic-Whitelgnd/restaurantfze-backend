import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FoodTypeEditList = () => {
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
        
        <ul>
          {
              tables.map(table => (
                  <li key={table._id}>
                    <Link to={`/edit-foodtype/${table._id}`}>{`${table.food_name}`}</Link>
                  </li>
                ))
          }
        </ul>
        
      </div>
    );
}

export default FoodTypeEditList;
