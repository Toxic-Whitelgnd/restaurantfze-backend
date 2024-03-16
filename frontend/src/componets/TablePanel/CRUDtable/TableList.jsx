// src/TableList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TableDelList.css';

const TableList = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('https://restogenius.onrender.com/table_data');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="container mt-4">
       <div className='tabledeli-list'>
      <h1 id='tabledeli-list-heading-head'>Select The Table To Edit</h1>
      <h4 id='tabledeli-list-heading'>InDoor Tables</h4>
      <ul className='tabledeli-list-ul'>
        {
            tables.filter(x => x.table_type === 'indoor').map(table => (
                <li key={table.tableNo}>
                  <Link to={`/admin/edit-table/${table.table_no}`}>{`Table ${table.table_no}`}</Link>
                </li>
              ))
        }
      </ul>
      <h4  id='tabledeli-list-heading'>OutDoor Tables</h4>
      <ul className='tabledeli-list-ul'>
        {tables.filter(x => x.table_type === 'outdoor').map(table => (
          <li key={table.tableNo}>
            <Link to={`/admin/edit-table/${table.table_no}`}>{`Table ${table.table_no}`}</Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TableList;
