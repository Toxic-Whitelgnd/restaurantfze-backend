import React from 'react';
import { NavLink } from 'react-router-dom';

const FoodPanel = () => {
    return (
        <div>
            <h1>Food Panel</h1>
            <div>
                <NavLink to='/admin/add-foodtype'>Add Food Type</NavLink>
                <br></br>
                <NavLink to='/admin/edit-foodtype'>Edit Food Type</NavLink>
                <br></br>
                <NavLink to='/admin/delete-foodtype'>Delete Food Type</NavLink>
                <br></br>
                <NavLink to='/admin/add-fooddata'>Add Food</NavLink>
                <br></br>
                <NavLink to='/admin/edit-fooddata'>Edit Food</NavLink>
                <br></br>
                <NavLink to='/admin/delete-fooddata'>Delete Food</NavLink>
                <br></br>
                
             
            </div>
        </div>
    );
}

export default FoodPanel;
