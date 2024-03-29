import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './takeawayDeliveryorder.css';   
const TakeawayDeliveryorder = () => {
    const [runningORder, setRunningOrder] = useState([]);
    useEffect(() => {
        fetchRunningOrder();

        const intervalId = setInterval(() => {
            fetchRunningOrder();
          }, 10000); // 5000 milliseconds = 5 seconds
      
          // Cleanup function to clear the interval when the component is unmounted
          return () => clearInterval(intervalId);
    }, []);

    const fetchRunningOrder = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/get_running_takeaway_order');
            console.log(response.data);
            setRunningOrder(response.data);
            checkforEmptyItems();
        } catch (error) {
            console.log(error.message);
        }
    }

    const checkforEmptyItems =  async()=>{
        try {
           
            console.log(runningORder);
            const emptyitems = runningORder.filter(x => x.items.length == 0);
            console.log("fks");
            console.log(emptyitems);
            try {
                const response = await axios.delete(`https://restogenius.onrender.com/delete_running_takeaway_order/${emptyitems[0]._id}`);
                if(response.data.success){
                    console.log("deleted");
                }
            } catch (error) {
                console.log(error.message);
            }
           

        } catch (error) {
            
        }
    }

    const handleDeleteRunningOrder = async (item,fooditems) => {
        console.log("delete the curently running order", item);
        const res = await axios.put(`https://restogenius.onrender.com/update_takeaway_backend_order/${item.orderno}`,item);
        console.log(res.data);

        handleCheckforItem(fooditems);
    };

    const handleCheckforItem = async (items) => {
        console.log("from handle dele");
        console.log(items);
    };

    return (
        <div  class='takeawayDeliveryorder-Data'>
            <h1 id='takeawayDeliveryorder-Data-heading' >Deliverysale  Order - Tracking</h1>
            <div class='takeawayDeliveryorder-itemboard'>
                {
                    runningORder && runningORder.map((order)=>{
                        return (
                            <>
                            
                        {order.items.filter((i)=> i.status == "ready").map((item)=>{
                            return(
                                <>
                                <h3>Table no : {order.order_no}</h3>
                                <h4>Food : {item.foodname} is                                 <span className={item.status === 'ready' ? 'ready-status' : 'not-ready-status'}>
                                {item.status}
                                                    </span>
                                </h4>
                                <button className='takeawayDeliveryorder-submit'onClick={()=>handleDeleteRunningOrder(item,order.items)} >Delivered </button>
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

export default TakeawayDeliveryorder;
