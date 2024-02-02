import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DeleteWaiterList = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
          try {
            const response = await axios.get('http://localhost:9999/get_waiter');
            setTables(response.data);
          } catch (error) {
            console.error('Error fetching tables:', error);
          }
        };

        


        fetchTables();
      }, []);
    return (
        <div className="container mt-4">
        <h1>Select the Waiter to Remove</h1>
    
        <ul>
          {
              tables.map(table => (
                  <li key={table.tableNo}>
                    <Link to={`/delete-waiter/${table._id}`}>{`${table.waiterName}`}</Link>
                  </li>
                ))
          }
        </ul>
        
      </div>
    );
}

export default DeleteWaiterList;
