import React from 'react';
import "./popup.css";

const TakeAwayViewPopup = ({ showModal, handleClose, time, recipientid, name, date, number, items, total, discount,
  paymentType, address, email }) => {
  return (
    <div className={`modal-tk ${showModal ? 'show' : ''}`}>
      <div className="modal-content-tk">
        <h3>Sale Order Item</h3>
        <span className="close" onClick={handleClose}>&times;</span>
        <div className='row'>
          <h5>Receipt ID: {recipientid}</h5>
          <div className='col rc-details'>

            <p>Order Date: <b>{date} </b></p>
            <p>Order Time: <b>{time}  </b></p>


            <p>Discount: <b>{discount} </b></p>
            <p>Payment Type: <b>{paymentType} </b></p>

          </div>
          <div className='col cust-details'>



            <p>Customer Name: <b>{name} </b></p>
            <p>Number: <b>{number} </b></p>
            <p>Email: <b>{email} </b></p>
            <p>Address: <b>{address} </b></p>

          </div>

        </div>
        <div>
          <h5 className='m-3'>Items Purchased:</h5>
          <ul className='cust-details'>
            {items.map((item, index) => (
              <span className='tk-ls' key={index}>
                <b>{item.foodname}  </b>- Qty: <b>{item.qty} </b>, Amount: <b>{item.price} </b>
              </span>
            ))}
          </ul>
        </div>
        <div className='ms-4 mt-3'>
          <p>Total: <b>{total} </b> AED</p>
        </div>

      </div>
    </div>
  );
};

export default TakeAwayViewPopup;
