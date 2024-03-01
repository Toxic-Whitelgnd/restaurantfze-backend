// src/TableList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TableDelList.css';

const TableDelList = () => {
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
      <h1>Select the Table to Delete</h1>
      <h4>Indoor Tables</h4>
      <ul>
        {
            tables.filter(x => x.table_type === 'indoor').map(table => (
                <li key={table.tableNo}>
                  <Link to={`/admin/delete-table/${table.table_no}`}>{`Table ${table.table_no}`}</Link>
                </li>
              ))
        }
      </ul>
      <h4>OutDoor Tables</h4>
      <ul>
        {tables.filter(x => x.table_type === 'outdoor').map(table => (
          <li key={table.tableNo}>
            <Link to={`/admin/delete-table/${table.table_no}`}>{`Table ${table.table_no}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableDelList;
