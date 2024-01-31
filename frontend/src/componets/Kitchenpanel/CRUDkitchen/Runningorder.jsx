import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Runningorder = () => {
    const [runningORder,setRunningOrder] = useState([]);
    useEffect(()=>{
        fetchRunningOrder();
    },[])

    const fetchRunningOrder = async ()=>{
        try {
            const response = await axios.get('http://localhost:9999/get_running_order');
            console.log(response.data);
            setRunningOrder(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <h1>Current running order</h1>
            <div>{ 
            runningORder && runningORder.map((val,idx)=>{
                return(
                    <>
                    <div>
                        <h2>Table no: {val.tableNo}</h2>
                        <h3>Items </h3> {
                                val.items.map(f =>{
                                    return(
                                        <>
                                        <h4>Item name: {f.foodname}</h4>
                                        <h4>Item Qty: {f.qty}</h4>
                                        <h4>Item status: {f.status}</h4>
                                        <h6> Things to do is set the item to ready and update in the databse</h6>
                                        </>
                                    )
                                })
                            }
                    </div>
                    
                    </>
                )
            })
            }</div>
        </div>
    );
}

export default Runningorder;
