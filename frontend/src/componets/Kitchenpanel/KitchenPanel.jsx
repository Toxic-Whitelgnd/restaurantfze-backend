import React from 'react';
import { NavLink } from 'react-router-dom';

const KitchenPanel = () => {
    return (
        <div>
            <h1>Kitchen Panel</h1>
            <div>
                <NavLink to='/admin/running-order'>Running Order</NavLink>
                <br></br>
                <NavLink to='/admin/changeavailibilty'>Change availibity of food</NavLink>
                <br></br>
                
             
            </div>
        </div>
    );
}

export default KitchenPanel;
