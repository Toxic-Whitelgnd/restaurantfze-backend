import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EditWaiterList = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
          try {
            const response = await axios.get('https://restogenius.onrender.com/get_waiter');
            setTables(response.data);
          } catch (error) {
            console.error('Error fetching tables:', error);
          }
        };

        


        fetchTables();
      }, []);
    return (
        <div className="container mt-4">
        <h1>Select the Waiter to Edit</h1>
    
        <ul>
          {
              tables.map(table => (
                  <li key={table.tableNo}>
                    <Link to={`/edit-waiter/${table._id}`}>{`${table.waiterName}`}</Link>
                  </li>
                ))
          }
        </ul>
        
      </div>
    );
}

export default EditWaiterList;
