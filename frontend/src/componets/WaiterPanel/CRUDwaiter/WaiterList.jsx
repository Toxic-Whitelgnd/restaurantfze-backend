import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './WaiterList.css';

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
          <div class='WaiterList-list'>
        <h1 id='WaiterList-list-heading'>Select The Waiter To Edit</h1>
    
        <ul className='WaiterList-list-ui'>
          {
              tables.map(table => (
                  <li key={table.tableNo}>
                    <Link to={`/admin/edit-waiter/${table._id}`}>{`${table.waiterName}`}</Link>
                  </li>
                ))
          }
        </ul>
        </div>
      </div>
    );
}

export default EditWaiterList;
