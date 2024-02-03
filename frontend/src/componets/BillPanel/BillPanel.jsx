import React from 'react';
import { NavLink } from 'react-router-dom';

const BillPanel = () => {
    return (
        <div>
            <h1>Bill panel</h1>
            <NavLink to='/bill-edit-panel'>Edit bill Panel</NavLink>
                <br></br>
                <NavLink to={'/tablepanel'}>Edit Reciepiet Panel</NavLink>
                <br></br>
        </div>
    );
}

export default BillPanel;
