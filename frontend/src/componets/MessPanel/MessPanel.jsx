import React from 'react';
import { NavLink } from 'react-router-dom';
import './MessPanel.css';
const MessPanel = () => {
    return (
        <div class='mess-panel'>
            <h1 id='mess-panel-heading'>Mess Panel</h1>
            <div class='option-mess-panel'>
                <NavLink to='/admin/edit-messDetails'className='edit-mess-panel'>Edit mess details</NavLink>
                <br></br>
                <NavLink to='/admin/delete-messDetails' className='delete-mess-panel'>Delete mess details</NavLink>
                <br></br>
             
            </div>
        </div>
    );
}

export default MessPanel;
