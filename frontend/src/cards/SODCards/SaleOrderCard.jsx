import React, { useState } from 'react';
import { motion } from "framer-motion"
import "./saleorder.css"
import SaleOrderView from './SaleOrderView';

const SaleOrderCard = ({ ordertype, name, odate, otime, recId, discount, total, bcolor, val }) => {



    // newo ne
    const handleShowModal = (val) => {
        console.log(val._id);
        window.location.href = `/#/sodcustomer/${val._id}`;
    };

    return (
        <div>
            <motion.div className='item-prdt'
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <div className='box-pdt-12' style={{ backgroundColor: `${bcolor}` }}>
                    <div className='row'>
                        <div className='col'>
                            <h5 className='text-capitalize'>Customer name:{name}</h5>
                        </div>
                        <div className='col'></div>
                        <div className='col'>
                            <h5>RecipentId:{recId}</h5>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col'><h6>Order type:{ordertype}</h6></div>
                        <div className='col'></div>
                        <div className='col'><h6>Discount: {discount}</h6></div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col'><h6>Date & time: {odate} {otime}</h6></div>
                        <div className='col'></div>
                        <div className='col'><h6>Total: {total}</h6></div>
                    </div>
                    <div className='row'>
                        <div className='col'></div>
                        <div className='col'>
                            <button onClick={()=>handleShowModal(val)} className='btn btn-primary me-4'>View Details</button>
                            <button className='btn btn-success'>Print</button>
                        </div>
                        <div className='col'></div>
                    </div>
                   
                    
                </div>
            </motion.div>
        </div>
    );
}

export default SaleOrderCard;
