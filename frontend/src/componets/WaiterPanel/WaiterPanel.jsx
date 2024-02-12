import React from 'react';
import { NavLink } from 'react-router-dom';

const WaiterPanel = () => {
    return (
        <div>
            <h1>Waiter Panel</h1>
            <div>
                <NavLink to='/admin/add-waiter'>Add waiter</NavLink>
                <br></br>
                <NavLink to='/admin/edit-waiter'>Edit waiter</NavLink>
                <br></br>
                <NavLink to='/admin/delete-waiter'>Delete waiter</NavLink>
                <br></br>
             
            </div>
        </div>
    );
}

export default WaiterPanel;
