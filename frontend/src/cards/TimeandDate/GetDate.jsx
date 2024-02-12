import React, { useEffect, useState } from 'react';

const GetDate = () => {
    //   displaying current date
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Update the date every second
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once after the initial render

    const formattedDate = currentDate.toLocaleDateString();

    return (
        <div>
            {formattedDate}
        </div>
    );
}

export default GetDate;
