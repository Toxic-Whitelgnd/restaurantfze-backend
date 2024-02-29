import React from 'react';
import { NavLink } from 'react-router-dom';
import './KitchenPanel.css'

const KitchenPanel = () => {
    return (
        <div class='Kitchen-Panel'>
            <div class='Kitchen-Panel-heading'>
            <h1>Kitchen Panel</h1>
            </div>
            <div class='Kitchen-Panel-option'>
                <NavLink to='/admin/running-order' className='Kitchen-running-order' style={{textDecoration:'none'}}>Running Order</NavLink>
                <br></br>
                <NavLink to='/admin/changeavailibilty' className='changeavailibilty'style={{textDecoration:'none'}}>Change Availibity of food</NavLink>
                <br></br>
                <NavLink to='/admin/running-delivery-order' className='running-delivery-order'style={{textDecoration:'none'}}>Running Delivery Sale order</NavLink>
                <br></br>
                <NavLink to='/admin/running-takeaway-order' className='running-takeaway-order' style={{textDecoration:'none'}}>Running TakeAway order</NavLink>
                <br></br>
                
             
            </div>
        </div>
    );
}

export default KitchenPanel;
