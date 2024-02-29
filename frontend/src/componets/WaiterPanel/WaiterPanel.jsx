import React from 'react';
import { NavLink } from 'react-router-dom';
import './WaiterPanel.css';
const WaiterPanel = () => {
    return (
        <div class='Waiter-Panel'>
            <div class='Waiter-Panel-heading'>
            <h1>Waiter Panel</h1>
            </div>
            <div class='Waiter-Panel-option'>
                <NavLink to='/admin/add-waiter'className='add-waiter' style={{textDecoration:'none'}}>Add waiter</NavLink>
                <br></br>
                <NavLink to='/admin/edit-waiter'className='edit-waiter'style={{textDecoration:'none'}}>Edit waiter</NavLink>
                <br></br>
                <NavLink to='/admin/delete-waiter'className='delete-waiter'style={{textDecoration:'none'}}>Delete waiter</NavLink>
                <br></br>
             
            </div>
        </div>
    );
}

export default WaiterPanel;
