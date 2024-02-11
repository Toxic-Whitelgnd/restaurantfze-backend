import React from 'react';
import "./settle.css"

const SettleCard = ({ name, total }) => {
    return (
        <div>
            <li class="otable-row-ss"  >

                <div class="colo colo-1-ss" data-label="Job Id">{name}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{total}</div>

            </li>
        </div>
    );
}

export default SettleCard;
