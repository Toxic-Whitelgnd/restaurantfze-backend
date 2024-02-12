import React, { useEffect, useRef, useState } from 'react';
import "./popup.css";

const Paybillpopup = ({ isOpen, onClose, orderDetails }) => {

    const modalRef = useRef();

    var overtot = 0;
    const calculateTotalAmount = (qty, price) => {
        // Calculate total amount based on quantity and price
        // You can customize this logic based on your requirement
        return qty * price;
    };

    function calTot(){
        for (var i = 0; i < orderDetails.length; i++) {
            console.log("qty", orderDetails[i].qty);
            console.log("price", orderDetails[i].price);
            var amt = orderDetails[i].qty * orderDetails[i].price;
            console.log(amt);
            overtot += amt;
        }
    }

    const calculateVAT = () => {
        var totalAmount = 0;
        for (var i = 0; i < orderDetails.length; i++) {
            var amt = orderDetails[i].qty * orderDetails[i].price;
            totalAmount += amt;
        }
        calTot();
        
        return 0.1 * totalAmount; // Assuming 10% VAT
    };
    const handlePayBill = () => {
        // Add logic here to handle the payment
        console.log('Payment processed successfully');
        // You can close the modal or perform other actions after payment
        onClose();
    };

    useEffect(() => {
        
    },[]);

    return (
        <div>
            {isOpen && (
                <div className="modal-overlay-1">
                    <div className="modal-1" ref={modalRef}>
                        <div className="modal-header-1">
                            <h2>Food Order Details</h2>
                            <button type="button" className="close-btn"  onClick={onClose}>
                                &times;
                            </button>
                        </div>
                        <ul class="responsive-table-popup">
                            <li class="otable-header">
                                <div class="colo colo-1">Id</div>
                                <div class="colo colo-2">Name</div>
                                <div class="colo colo-5">Quantity</div>
                                <div class="colo colo-3">Price</div>
                                <div class="colo colo-4">Amount</div>
                            </li>


                            {orderDetails && orderDetails.map((val, idx) => {
                                return (
                                    <>
                                        <li class="otable-row">
                                            <div class="colo colo-1" data-label="Job Id">1</div>
                                            <div class="colo colo-2" data-label="Customer Name">{val.foodName}</div>
                                            <div class="colo colo-5" data-label="Amount">{val.qty}</div>
                                            <div class="colo colo-3" data-label="Amount">{val.price}</div>
                                            <div class="colo colo-4" data-label="Payment Status">{calculateTotalAmount(val.qty, val.price)}</div>
                                        </li>
                                        
                                    </>
                                )
                            })}
                        </ul>

                        <div className="order-details-row">
                            <p>VAT:</p>
                            {calculateVAT()} %
                            
                        </div>
                        <div className="order-details-row">
                            <p>Total:</p>
                            <p>AED {overtot}</p>
                            
                        </div>
                        <button className="btn btn-success" onClick={handlePayBill} >Pay Bill</button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Paybillpopup;
