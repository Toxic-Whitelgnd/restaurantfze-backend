import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DineinDeliveryorder = () => {
    const [runningORder, setRunningOrder] = useState([]);
    useEffect(() => {
        fetchRunningOrder();

        const intervalId = setInterval(() => {
            fetchRunningOrder();
          }, 5000); // 5000 milliseconds = 5 seconds
      
          // Cleanup function to clear the interval when the component is unmounted
          return () => clearInterval(intervalId);
    }, [])

    const fetchRunningOrder = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/get_running_order');
            console.log(response.data);
            setRunningOrder(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeleteRunningOrder = async (item) => {
        console.log("delete the curently running order", item);
        const res = await axios.put(`https://restogenius.onrender.com/update_running_items/${item.table_no}`,item);
        console.log(res.data);
    };

    return (
        <div>
            <h1>Dine in Delivery Order - Tracking</h1>
            <div>
                {
                    runningORder && runningORder.map((order)=>{
                        return (
                            <>
                            
                        {order.items.filter((i)=> i.status == "ready").map((item)=>{
                            return(
                                <>
                                <h3>Table no : {order.tableNo}</h3>
                                <h4>Food : {item.foodname} is {item.status}</h4>
                                <button onClick={()=>handleDeleteRunningOrder(item)} >Delivered </button>
                                </>
                            )
                        })}
                            </>
                        )
                    })
                }
            </div>
            

        </div>
    );
}

export default DineinDeliveryorder;
