import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EditMessDetailsList.css';
const EditMessDetailsList = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
          try {
            const response = await axios.get('https://restogenius.onrender.com/get_messDetails');
            setTables(response.data);
          } catch (error) {
            console.error('Error fetching tables:', error);
          }
        };

        fetchTables();
      }, []);
    return (
        <div className="container mt-4">
          <div class='EditMessDetailsList-list'>
        <h1 id='EditMessDetailsList-list-heading'>Select The Mess Details To Edit</h1>
    
        <ul className='EditMessDetailsList-list-ui'>
          {
              tables.map(table => (
                  <li key={table._id}>
                    <Link to={`/admin/edit-messDetails/${table._id}`}>{`Name-${table.name},MobileNo-${table.mobileNumber}`}</Link>
                  </li>
                ))
          }
        </ul>
        </div>
      </div>
    );
}

export default EditMessDetailsList;
