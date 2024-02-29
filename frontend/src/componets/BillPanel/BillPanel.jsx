import React from 'react';
import { NavLink } from 'react-router-dom';
import './BillPanel.css';

const BillPanel = () => {
    return (
        <div class='billPanel'>
            <div class='head'><h1>Bill Panel</h1></div> 
            <div class='edit-bill-option'>
                <NavLink to='/admin/bill-edit-panel' style={{ textDecoration: 'none'}}>Edit bill Panel</NavLink>
                <br></br>
                <NavLink to={'/admin/tablepanel'} style={{ textDecoration: 'none'}}>Edit Reciepiet Panel</NavLink>
                <br></br>
            </div>
        </div>
    );
}

export default BillPanel;
