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
        <div class='food-del-list'>
        <h1 id='food-del-list-heading'>Select The Type To Delete</h1>
        <ul className='food-del-list-ui'>
          {
              tables.map(table => (
                  <li key={table._id}>
                    <Link to={`/admin/delete-foodtype/${table._id}`}>{`${table.food_name}`}</Link>
                  </li>
                ))
          }
        </ul>
        </div>
      </div>
    );
}

export default FoodTypeDelList;
