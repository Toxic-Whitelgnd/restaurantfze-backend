import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DeleteList.css';

const DeleteDeleteList = () => {
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
        <div class='DeleteList-list'>
        <h1 id='DeleteList-list-heading'>Select The Waiter To Remove</h1>
    
        <ul className='DeleteList-list-ui'>
          {
              tables.map(table => (
                  <li key={table.tableNo}>
                    <Link to={`/admin/delete-waiter/${table._id}`}>{`${table.waiterName}`}</Link>
                  </li>
                ))
          }
        </ul>
        </div>
      </div>
    );
}

export default DeleteDeleteList;
