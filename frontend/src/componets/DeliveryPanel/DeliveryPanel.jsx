import React from 'react';
import { NavLink } from 'react-router-dom';

const DeliveryPanel = () => {
    return (
        <div>
            <h1>Food Delivery Panel</h1>
            <div>
                <NavLink to='/dinein-delivery-order'>Dinein Delivery Order</NavLink>
                <br></br>
                <NavLink to='/takeaway-delivery-order'>Takeaway Delivery Order</NavLink>
                <br></br>
                <NavLink to='/deliverysale-delivery-order'>DeliverySale Delivery Order</NavLink>
                <br></br>
                <NavLink to='/deliverysale-takeaway-order'>Takeaway Delivery Order</NavLink>
                <br></br>
             
            </div>
        </div>
    );
}

export default DeliveryPanel;
