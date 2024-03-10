// src/HomeEditList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomeEditList.css';

const HomeEditList = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('https://restogenius.onrender.com/home_page_data');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="container mt-4">
        <div class='edit-home'>
        <div class='edit-home-heading'>
      <h1>Select The Home Name To Edit</h1>
      </div>
      <div class='edit-home-options'>
      <ul>
        {
            tables.map(table => (
                <li key={table.tableNo}s>
                  <Link to={`/admin/edit-home/${table.home_id}`} style={{textDecoration:'none'}}>{`${table.home_name}`}</Link>
                </li>
              ))
        }
      </ul>
      </div>
      </div>
    </div>
  );
};

export default HomeEditList;
