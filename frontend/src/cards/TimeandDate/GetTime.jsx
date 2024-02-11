import React, { useEffect, useState } from 'react';

const GetTime = () => {
    // displaying the current time
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        // Update the time every second
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once after the initial render

    const formattedTime = currentTime.toLocaleTimeString();
    return (
        <div>
            <br></br>
            {formattedTime}
        </div>
    );
}

export default GetTime;
