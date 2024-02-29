import React from 'react';
import { NavLink } from 'react-router-dom';
import './FoodPanel.css';
const FoodPanel = () => {
    return (
        <div class='food-panel'>
            <div class='food-panel-heading'>
            <h1>Food Panel</h1>
            </div>
            <div class ='food-panel-option'>
            <div class ='food-panel-option-1'>  
                <NavLink to='/admin/add-foodtype' className='add-foodtype'style={{ textDecoration: 'none'}}>Add Food Type</NavLink>
                <br></br>
                <NavLink to='/admin/edit-foodtype'className='edit-foodtype'style={{ textDecoration: 'none'}}>Edit Food Type</NavLink>
                <br></br>
                <NavLink to='/admin/delete-foodtype'className='delete-foodtype'style={{ textDecoration: 'none'}}>Delete Food Type</NavLink>
                <br></br>
            </div>  
            <div class ='food-panel-option-2'>
                <NavLink to='/admin/add-fooddata'className='add-fooddata'style={{ textDecoration: 'none'}}>Add Food</NavLink>
                <br></br>
                <NavLink to='/admin/edit-fooddata'className='edit-fooddata'style={{ textDecoration: 'none'}}>Edit Food</NavLink>
                <br></br>
                <NavLink to='/admin/delete-fooddata'className='delete-fooddata'style={{ textDecoration: 'none'}}>Delete Food</NavLink>
                <br></br>
            </div>  
             
            </div>
        </div>
    );
}

export default FoodPanel;
