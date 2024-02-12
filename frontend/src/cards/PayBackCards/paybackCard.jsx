import React from 'react';
import "./paybackcard.css"
import { motion } from "framer-motion"

const PaybackCard = ({ name, recId, trasactionid, paidby, number, total, odate, otime, bcolor }) => {
    return (
        <div>
            <motion.div className='item-prdt'

                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 1.0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}>

                <div className='box-pdt-1-pb' style={{ backgroundColor: `${bcolor}` }}>
                    <div className='row'>
                        <div className='col'>
                            <h5 className='text-capitalize'>Customer name:{name}</h5>
                        </div>
                        <div className='col'><h5 className='text-capitalize'>Number : {number}</h5></div>
                        <div className='col'>
                            <h5>RecipentId:{recId}</h5>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col'><h6>TransactionId:{trasactionid}</h6></div>
                        <div className='col'></div>
                        <div className='col'><h6>PaidBy: {paidby}</h6></div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col'><h6>Date & time: {odate} {otime}</h6></div>
                        <div className='col'></div>
                        <div className='col'><h6>Total: {total}</h6></div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}

export default PaybackCard;
