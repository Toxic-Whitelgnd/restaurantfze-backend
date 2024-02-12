import React from 'react';

const CRMCards = ({name,status,number,email}) => {
    return (
        <div>
            <li class="otable-row-ss"  >

                <div class="colo colo-1-ss" data-label="Job Id">{name}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{number}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{email}</div> 
                <div class="colo colo-4-ss" data-label="Payment Status">{status}</div>

            </li>
        </div>
    );
}

export default CRMCards;
