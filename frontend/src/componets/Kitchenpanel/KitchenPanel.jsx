import React from 'react';
import { NavLink } from 'react-router-dom';

const KitchenPanel = () => {
    return (
        <div>
            <h1>Kitchen Panel</h1>
            <div>
                <NavLink to='/running-order'>Running Order</NavLink>
                <br></br>
                <NavLink to='/changeavailibilty'>Change availibity of food</NavLink>
                <br></br>
                <NavLink to='/running-delivery-order'>Running Delivery Sale order</NavLink>
                <br></br>
                <NavLink to='/running-takeaway-order'>Running TakeAway order</NavLink>
                <br></br>
                
             
            </div>
        </div>
    );
}

export default KitchenPanel;
