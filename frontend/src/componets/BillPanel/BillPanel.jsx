import React from 'react';
import { NavLink } from 'react-router-dom';
import './BillPanel.css';

const BillPanel = () => {
    return (
<<<<<<< HEAD
        <div class='billPanel'>
           <div class='head'><h1>Bill Panel</h1></div> 
            <div class='edit-bill-option'>
            <NavLink to='/admin/bill-edit-panel' style={{ textDecoration: 'none'}}>Edit bill Panel</NavLink>
            <NavLink to={'/admin/tablepanel'} style={{ textDecoration: 'none'}}>Edit Reciepiet Panel</NavLink>
               <br></br>
               </div>
=======
        <div>
            <h1>Bill panel</h1>
            <NavLink to='/admin/bill-edit-panel'>Edit bill Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/recipiet-edit-panel'}>Edit Reciepiet Panel</NavLink>
                <br></br>
>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
        </div>
    );
}

export default BillPanel;
