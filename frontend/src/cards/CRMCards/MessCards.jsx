import React from 'react';

const MessCards = ({ name, idno, mealfreq, amt, joiningdate, closingdate }) => {
    const days = 22;
    const calculateDays = (startDate, endDate) => {
        const formattedStartDate = new Date(startDate);
        const formattedEndDate = new Date(endDate);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = formattedEndDate - formattedStartDate;

        // Calculate the difference in days
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        return differenceInDays;
    }
    return (
        <div>
            <li class="otable-row-ss"  >

                <div class="colo colo-1-ss" data-label="Job Id">{idno}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{name}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{mealfreq === '1time' ? amt * calculateDays(joiningdate, closingdate) : '-'}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{mealfreq === '2time' ? amt * calculateDays(joiningdate, closingdate) : '-'}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{mealfreq === '3time' ? amt * calculateDays(joiningdate, closingdate) : '-'}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{calculateDays(joiningdate, closingdate)}</div>

            </li>
        </div>
    );
}

export default MessCards;
