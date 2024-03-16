import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './Runningorder.css';
const Runningorder = () => {
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
            const response = await axios.get('https://restogenius.onrender.com/get_running_order');
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
                        if (val.id == item.id && food.tableNo == val.table_no) {
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
        toast.success("updated");


    };

    const handleUpdateNot = async (food, item) => {
        console.log(item.status);
        setRunningOrder((prevOrder) => {
            return prevOrder.map((order) => {
                return {
                    ...order,
                    items: order.items.map((val) => {
                        if (val.id === item.id && food.tableNo == val.table_no) {
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
        const res = await axios.put(`https://restogenius.onrender.com/update_running_order/${val.tableNo}`,
            val);
        console.log(res.data);
        toast.success("Saved");

    }

    return (
        <div class='Runnigorder-Data'>
            <ToastContainer />
            <h1  id='Runnigorder-Data-heading'>Current running order</h1>
            
            <div>{
                runningORder  && runningORder.map((val, idx) => {
                    return (
                        <> {
                            <div class='RunnigOrder-itemboard'>
                                <h2>Table no: {val.tableNo}  Order From: {val.from}</h2>
                                <h3>Items </h3> {
                                    val.items.map(f => {
                                        return (
                                            <>
                                                <h4>Item name: {f.foodname}</h4>
                                                <h4>Item Qty: {f.qty} {f.id}</h4>
                                                <h4>Item status: 
                                                    <span className={f.status === 'ready' ? 'ready-status' : 'not-ready-status'}>
                                                        {f.status}
                                                    </span>
                                                </h4>
                                                
                                                <label htmlFor="orderStatus">Order Status:</label>

                                                <button class='RunnigOrder-ready-button' onClick={() => handleUpdate(val, f)}>Update status to ready</button>
                                                <button class='RunnigOrder-Notready-button' onClick={() => handleUpdateNot(val, f)}>Update status to Not-ready</button>

                                            </>
                                        )
                                    })
                                    
                                }
                                <button className='ChangeFoodAvail-submit' onClick={()=>handleSave(val)}>Save changes</button>
                                
                            </div >
                            }
                        </>
                    )
                })
            }</div>
        </div >
    );
}

export default Runningorder;
