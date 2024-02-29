import React from 'react';
import { NavLink } from 'react-router-dom';
import './DeliveryPanel.css';

const DeliveryPanel = () => {
    return (
        <div class='Food-Delivery-Panel'>
            <div class='Food-Delivery-Panel-heading'>
            <h1>Food Delivery Panel</h1>
            </div>
            <div class='Food-Delivery-Panel-option'>
            <div class='Food-Delivery-Panel-option-1'>
                <NavLink to='/admin/dinein-delivery-order' className='dinein-delivery-order'style={{ textDecoration:'none'}}>Dinein Delivery Order</NavLink>
                <br></br>
                <NavLink to='/admin/takeaway-delivery-order'className='takeaway-delivery-order'style={{ textDecoration:'none'}}>Takeaway Delivery Order</NavLink>
                <br></br>
            </div>
            <div class='Food-Delivery-Panel-option-2'>
                <NavLink to='/admin/deliverysale-delivery-order' className='deliverysale-delivery-order' style={{ textDecoration:'none'}}>Delivery-Sale Delivery Order</NavLink>
                <br></br>
                <NavLink to='/admin/deliverysale-takeaway-order' className='deliverysale-takeaway-order'style={{ textDecoration:'none'}}>Takeaway Delivery Order</NavLink>
                <br></br>
            </div>
            </div>
        </div>
    );
}

export default DeliveryPanel;
