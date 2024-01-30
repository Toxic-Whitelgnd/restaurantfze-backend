import React from 'react';
import { NavLink } from 'react-router-dom';

const FoodPanel = () => {
    return (
        <div>
            <h1>Food Panel</h1>
            <div>
                <NavLink to='/add-foodtype'>Add Food Type</NavLink>
                <br></br>
                <NavLink to='/edit-foodtype'>Edit Food Type</NavLink>
                <br></br>
                <NavLink to='/delete-foodtype'>Delete Food Type</NavLink>
                <br></br>
                <NavLink to='/add-fooddata'>Add Food</NavLink>
                <br></br>
                <NavLink to='/edit-fooddata'>Edit Food</NavLink>
                <br></br>
                <NavLink to='/delete-fooddata'>Delete Food</NavLink>
                <br></br>
                
             
            </div>
        </div>
    );
}

export default FoodPanel;
