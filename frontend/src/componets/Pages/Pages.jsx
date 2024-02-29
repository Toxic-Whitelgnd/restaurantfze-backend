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
            <div class='option-panel-1'>
                <NavLink to='/admin/homepanel' className='HOME-P'style={{ textDecoration: 'none'}}>Home Panel </NavLink>
                <br></br>
                <NavLink to={'/admin/tablepanel'} className='TABLE-P'style={{ textDecoration: 'none'}}>Table Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/foodpanel'} className='FOOD-P'style={{ textDecoration: 'none'}}>Food Panel </NavLink>
                <br></br>
                
            </div>
            <div  class='option-panel-2'>
                <NavLink to={'/admin/kitchenpanel'}className='KITCHEN-P'style={{ textDecoration: 'none'}}>Kitchen Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/billpanel'}className='BILL-P'style={{ textDecoration: 'none'}}>Bill Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/waiterpanel'}className='WAITER-P'style={{ textDecoration: 'none'}}>Waiter Panel</NavLink>
                <br></br>
                
            </div>
            <div class="option-panel-3"> 
                 
                <NavLink to={'/admin/deliverypanel'}className='DELIVERY-P'style={{ textDecoration: 'none'}}>DeliveryOrder<br></br> Panel</NavLink>
                <br></br>
            </div>
            </div>
        </div>
    );
}

export default Pages;
