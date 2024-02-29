import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomePanel.css'

const HomePanel = () => {
    return (
        <div class='home-panel'>
            <div class='home-panel-heading'>
            <h1>Home Panel</h1>
            </div>
            <div class='option-home-panel'>
                <NavLink to='/admin/edit-home' className='edit-home-panel'style={{ textDecoration: 'none'}}>Edit<br/>Home</NavLink>
                <br></br>
                <NavLink to='/admin/delete-home' className='delete-home-panel'style={{ textDecoration: 'none'}}>Delete Home</NavLink>
                <br></br>
                
             
            </div>
        </div>
    );
}

export default HomePanel;
