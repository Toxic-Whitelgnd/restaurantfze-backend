import React from 'react';
import { NavLink } from 'react-router-dom';

const Pages = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <NavLink to='/admin/homepanel'>Home Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/tablepanel'}>Table Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/foodpanel'}>Food Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/kitchenpanel'}>Kitchen Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/deliverypanel'}>Delivery order Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/waiterpanel'}>WaiterPanel</NavLink>
                <br></br>
                <NavLink to={'/admin/billpanel'}>Bill Panel</NavLink>
                <br></br>
            </div>
        </div>
    );
}

export default Pages;
