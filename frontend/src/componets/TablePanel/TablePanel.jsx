import React from 'react';
import { NavLink } from 'react-router-dom';

const TablePanel = () => {
    return (
        <div>
            <h1>Table Panel</h1>
            <div>
                <NavLink to='/create-table'>Create Table</NavLink>
                <br></br>
                <NavLink to='/edit-table'>Edit Table</NavLink>
                <br></br>
                <NavLink to='/delete-table'>Delete Table</NavLink>
             
            </div>
        </div>
    );
}

export default TablePanel;
