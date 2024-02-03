import React from 'react';
import { NavLink } from 'react-router-dom';

const Pages = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <NavLink to='/homepanel'>Home Panel</NavLink>
                <br></br>
                <NavLink to={'/tablepanel'}>Table Panel</NavLink>
                <br></br>
                <NavLink to={'/foodpanel'}>Food Panel</NavLink>
                <br></br>
                <NavLink to={'/kitchenpanel'}>Kitchen Panel</NavLink>
                <br></br>
                <NavLink to={'/deliverypanel'}>Delivery order Panel</NavLink>
                <br></br>
                <NavLink to={'/waiterpanel'}>WaiterPanel</NavLink>
                <br></br>
                <NavLink to={'/billpanel'}>Bill Panel</NavLink>
                <br></br>
            </div>
        </div>
    );
}

export default Pages;
