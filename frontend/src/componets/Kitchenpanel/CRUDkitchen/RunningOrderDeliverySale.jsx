import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const RunningOrderDeliverySale = () => {
    const [runningORder, setRunningOrder] = useState([]);
    useEffect(() => {
        fetchRunningOrder();
    }, [])

    const [selectedStatus, setSelectedStatus] = useState('Order Ready');

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const fetchRunningOrder = async () => {
        try {
            const response = await axios.get('http://localhost:9999/get_running_deliverysale_order');
            console.log(response.data);
            setRunningOrder(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleUpdate = async (food, item) => {
        console.log(item.status);
        setRunningOrder((prevOrder) => {
            return prevOrder.map((order) => {
                return {
                    ...order,
                    items: order.items.map((val) => {
                        if (val.id == item.id && food.orderno == val.order_no) {
                            console.log("belongs to", val.foodname);
                            const updatestatus = "ready";
                            return {
                                ...val,
                                status: "ready"
                            };
                        }
                        console.log(order.items.status);
                        return val;
                    }),
                };
            });
        });

        console.log("updated", runningORder);
        console.log(item.status);


    };

    const handleUpdateNot = async (food, item) => {
        console.log(item.status);
        setRunningOrder((prevOrder) => {
            return prevOrder.map((order) => {
                return {
                    ...order,
                    items: order.items.map((val) => {
                        // change the orderno to tableno
                        if (val.id === item.id && food.orderno == val.order_no) {
                            console.log("belongs to", val.foodname);
                            const updatestatus = "not ready";
                            return { ...val, status: updatestatus };
                        }
                        return val;
                    }),
                };
            });
        });
        console.log(item.status);
    };

    const handleSave = async (val) => {
        console.log("mf runingorder", val);
        const res = await axios.put(`http://localhost:9999/update_running_deliverysale_order/${val.order_no}`,
            val);
        console.log(res.data);

    }
    return (
        <div>
            <h1>Current running order of DeliverySale</h1>
            
            <div>{
                runningORder  && runningORder.map((val, idx) => {
                    return (
                        <> {
                            <div>
                                <h2>order no: {val.order_no}  Order From: {val.orderFrom}</h2>
                                <h3>Items </h3> {
                                    val.items.map(f => {
                                        return (
                                            <>
                                                <h4>Item name: {f.foodname}</h4>
                                                <h4>Item Qty: {f.qty} {f.id}</h4>
                                                <h4>Item status: {f.status}</h4>
                                                
                                                <label htmlFor="orderStatus">Order Status:</label>

                                                <button onClick={() => handleUpdate(val, f)}>Update status to ready</button>
                                                <button onClick={() => handleUpdateNot(val, f)}>Update status to Not-ready</button>

                                            </>
                                        )
                                    })
                                    
                                }
                                <button onClick={()=>handleSave(val)}>Save changes</button>
                                
                            </div >
                            }
                        </>
                    )
                })
            }</div>
        </div >
    );
}

export default RunningOrderDeliverySale;
