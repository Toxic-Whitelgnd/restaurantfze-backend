import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeDelList = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('http://localhost:9999/home_page_data');
                setTables(response.data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);
    return (
        <div className="container mt-4">
            <h1>Select the HomeName to Edit</h1>
            <ul>
                {
                    tables.map(table => (
                        <li key={table.tableNo}>
                            <Link to={`/delete-home/${table.home_id}`}>{`${table.home_name}`}</Link>
                        </li>
                    ))
                }
            </ul>

        </div>
    );
}

export default HomeDelList;
