import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <h1>Select the Mess Details to Edit</h1>
    
        <ul>
          {
              tables.map(table => (
                  <li key={table._id}>
                    <Link to={`/admin/edit-messDetails/${table._id}`}>{`${table._id}-${table.name}-${table.mobileNumber}`}</Link>
                  </li>
                ))
          }
        </ul>
        
      </div>
    );
}

export default EditMessDetailsList;
