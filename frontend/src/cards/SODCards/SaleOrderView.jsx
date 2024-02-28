import React, { useEffect, useState } from 'react';
import "./saleorder.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SaleOrderView = () => {
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const [customerDetails, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://restogenius.onrender.com/get_customerbyid/${id}`)
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div> {customerDetails && (
            <>
            <h1>Customer details</h1>
            <h5>Mobile Number: {customerDetails.customer_mobileNumber}</h5>
            <h5>Name: {customerDetails.customer_name}</h5>
            <h5>Date: {customerDetails.date}</h5>
            <h5>Items Ordered: {customerDetails.items_ordered}</h5>
            <h5>Items:{customerDetails.items && customerDetails.items.map((val)=>(
                <>
                <div className='ms-5'>
                <h6>Item name: {val.foodname}</h6>
                <h6>Item qty: {val.qty}</h6>
                <h6>Item price: {val.price}</h6>
                </div>
                <div>------------------------------</div>
                </>
            ))}</h5>
            <h5>Order From: {customerDetails.orderFrom}</h5>
            <h5>Order Number: {customerDetails.order_no}</h5>
            <h5>Ordered Table Number: {customerDetails.ordered_tableno}</h5>
            <h5>Paid By: {customerDetails.paid_by}</h5>
            <h5>Time: {customerDetails.time}</h5>
            <h5>Total: {customerDetails.total}</h5>
            <h5>Total People: {customerDetails.total_ppl}</h5>
            <h5>Type: {customerDetails.type}</h5>
            <h5>VAT: {customerDetails.vat}</h5>
            <h5>Waiter Name: {customerDetails.waiter_name}</h5>
            </>
            )}
        </div>
    );
};

export default SaleOrderView;
