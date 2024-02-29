import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pages.css';

const Pages = () => {
    return (
        <div class='admin-panel-body'>
            <div class='admin-panel-head'>
                <h1>Admin Panel</h1>
            </div>
            <div class='option-panel'>
                <div class='option-panel-row'>
                    <NavLink to='/admin/homepanel' className='HOME-P' style={{ textDecoration: 'none' }}>Home Panel </NavLink>
                    <NavLink to={'/admin/tablepanel'} className='TABLE-P' style={{ textDecoration: 'none' }}>Table Panel</NavLink>
                    <NavLink to={'/admin/foodpanel'} className='FOOD-P' style={{ textDecoration: 'none' }}>Food Panel </NavLink>
                    <NavLink to={'/admin/kitchenpanel'} className='KITCHEN-P' style={{ textDecoration: 'none' }}>Kitchen Panel</NavLink>
                </div>
                <div class='option-panel-row'>
                    <NavLink to={'/admin/billpanel'} className='BILL-P' style={{ textDecoration: 'none' }}>Bill Panel</NavLink>
                    <NavLink to={'/admin/waiterpanel'} className='WAITER-P' style={{ textDecoration: 'none' }}>Waiter Panel</NavLink>
                    <NavLink to={'/admin/deliverypanel'} className='DELIVERY-P' style={{ textDecoration: 'none' }}>Delivery Order Panel</NavLink>
                    <NavLink to={'/admin/messpanel'} className='messpanel' style={{ textDecoration: 'none' }}>Mess Panel</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Pages;
