import React from 'react';
import { NavLink } from 'react-router-dom';

const WaiterPanel = () => {
    return (
        <div>
            <h1>Waiter Panel</h1>
            <div>
                <NavLink to='/add-waiter'>Add waiter</NavLink>
                <br></br>
                <NavLink to='/edit-waiter'>Edit waiter</NavLink>
                <br></br>
                <NavLink to='/delete-waiter'>Delete waiter</NavLink>
                <br></br>
             
            </div>
        </div>
    );
}

export default WaiterPanel;
