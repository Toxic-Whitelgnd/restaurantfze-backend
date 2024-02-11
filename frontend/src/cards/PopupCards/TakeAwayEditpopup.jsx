import React, { useState } from 'react';
import "./popup.css";

const TakeAwayEditpopup = ({ showPopup, handleClose, time, recipientid, name, date, number, items, total, discount,
    paymentType, address, email, handleSave, allVal }) => {
    const [editedSaleOrder, setEditedSaleOrder] = useState(allVal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSaleOrder((prev) => ({ ...prev, [name]: value }));
        console.log(editedSaleOrder);
    };
    return (
        <div>
            <div className={`popup ${showPopup ? 'show' : ''}`}>
                <div className="popup-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                    <div className='row'>
                        <div className="col">
                            <div>
                                <label>Receipt ID:</label>
                                <input id="exp-input" type="text" name="order_no" value={editedSaleOrder.order_no} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Order Date:</label>
                                <input id="exp-input"  type="text" name="date" value={editedSaleOrder.date} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Order Time:</label>
                                <input id="exp-input" type="text" name="time" value={editedSaleOrder.time} onChange={handleChange} />
                            </div>

                        </div>
                        <div className="col">
                            <div>
                                <label>Customer Name:</label>
                                <input id="exp-input" type="text" name="customer_name" value={editedSaleOrder.customer_name} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Number:</label>
                                <input id="exp-input" type="text" name="customer_mobileNumber" value={editedSaleOrder.customer_mobileNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input id="exp-input" type="text" name="customer_email" value={editedSaleOrder.customer_email} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Address:</label>
                                <input id="exp-input" type="text" name="customer_address" value={editedSaleOrder.customer_address} onChange={handleChange} />
                            </div>
                        </div>
                    </div>


                    <div>
                        <label>Items Purchased:</label>
                        <ul>
                            {editedSaleOrder.items.map((item, index) => (
                                <li key={index}>
                                    <span>{item.foodname}</span>
                                    <span>Qty: <input id="exp-input" type="text" name="quantity" value={item.qty} /></span>
                                    <span>Amount: <input id="exp-input" type="text" name="amount" value={item.price} /></span>
                                </li>
                            ))}
                        </ul>
                        <button onClick={()=>{
                          window.location.href = `/#/takeawayedit/${recipientid}`  
                        }} className='btn btn-primary mb-5'>Add from Dashboard</button>
                    </div>
                    <div>
                        <label>Total:</label>
                        <input type="text" id="exp-input" name="total" value={editedSaleOrder.total} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Discount:</label>
                        <input type="text" id="exp-input" name="discount" value={editedSaleOrder.discount} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Payment Type:</label>
                        <input type="text" id="exp-input" name="paymentype" value={editedSaleOrder.paid_by} onChange={handleChange} />
                    </div>
                    <button className="btn-save" onClick={() => handleSave(editedSaleOrder)}>
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="30"
                                    height="30"
                                    class="icon"
                                >
                                    <path
                                        d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TakeAwayEditpopup;

// TODO: When we click on the add from dashboard create one compoent pass with the recipient id and try
// to update the order with id so it will be easy in the dashboard 