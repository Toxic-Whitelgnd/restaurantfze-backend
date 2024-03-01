import React from 'react';
import { NavLink } from 'react-router-dom';
import './TablePanel.css';
const TablePanel = () => {
    return (
        <div class='table-panel'>
            <div class='table-panel-heading'><h1>Table Panel</h1></div>
            <div class='table-panel-option'>
                <NavLink to='/admin/create-table' className='create-table'style={{ textDecoration: 'none'}}>Create Table</NavLink>
                <br></br>
                <NavLink to='/admin/edit-table'className='edit-table'style={{ textDecoration: 'none'}}>Edit Table</NavLink>
                <br></br>
                <NavLink to='/admin/delete-table' className='delete-table'style={{ textDecoration: 'none'}}>Delete Table</NavLink>
                </div>  
        </div>
        
    );
}

export default TablePanel;
