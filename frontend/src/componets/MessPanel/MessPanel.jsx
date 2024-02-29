import React from 'react';
import { NavLink } from 'react-router-dom';

const MessPanel = () => {
    return (
        <div>
            <h1>Mess Panel</h1>
            <div>
                <NavLink to='/admin/edit-messDetails'>Edit mess details</NavLink>
                <br></br>
                <NavLink to='/admin/delete-messDetails'>Delete mess details</NavLink>
                <br></br>
             
            </div>
        </div>
    );
}

export default MessPanel;
