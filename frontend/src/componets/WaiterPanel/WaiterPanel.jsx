import React from 'react';
import { NavLink } from 'react-router-dom';

const WaiterPanel = () => {
    return (
        <div>
            <h1>Waiter Panel</h1>
            <div>
                <NavLink to='/dinein-delivery-order'>Add waiter</NavLink>
                <br></br>
                <NavLink to='/takeaway-delivery-order'>Edit waiter</NavLink>
                <br></br>
                <NavLink to='/deliverysale-delivery-order'>Delete waiter</NavLink>
                <br></br>
             
            </div>
        </div>
    );
}

export default WaiterPanel;
