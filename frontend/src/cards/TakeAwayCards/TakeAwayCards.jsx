import React, { useState } from 'react';
import "./takewaycard.css";
import TakeAwayViewPopup from '../PopupCards/TakeAwayViewPopup';
import TakeAwayEditpopup from '../PopupCards/TakeAwayEditpopup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const TakeAwayCards = ({ name, recipientid, date, time, total, number, paymentType,
  items, discount, email, address, allVal }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSaleOrder, setSelectedSaleOrder] = useState(null);

  const handleShowModal = () => {
    setSelectedSaleOrder();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = (saleOrder) => {

    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSave = (editedSaleOrder) => {
    // Handle save logic here
    console.log('Edited Sale Order:', editedSaleOrder);
    setShowPopup(false);
  };

  const [showCard, setShowCard] = useState(true);

  const handleDelete = async () => {
    // Handle delete logic here
    try {
        const deleteLog = await axios.delete(`http://localhost:9999/delete_takeaway_order/${recipientid}`);
        if(deleteLog.data.success){
          toast.success("Log has been deleted successfully")
        }
  
    } catch (error) {
      console.log(error);
    }
    setShowCard(false)

  };

  return (
    <div>{showCard && (


      <div>
        <li class="otable-row-ss" >

          <div class="colo colo-1-tk" data-label="Job Id">{recipientid}</div>
          <div class="colo colo-1-tk" data-label="Payment Status">{name}</div>
          <div class="colo colo-1-tk" data-label="Payment Status">{date}{time}</div>
          <div class="colo colo-1-tk" data-label="Payment Status">{total}</div>
          <div class="colo colo-4-tk" data-label="Payment Status">
            <button class="cssbuttons-io-button" onClick={() => handleShowModal()}> View Details
              <div class="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
              </div>
            </button>
            <button class="Btn mt-1 ms-2" onClick={() => handleShowPopup()}>Edit
              <svg class="svg" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
            </button>
            <ToastContainer />
            <button type="button" onClick={() => handleShowPopup()} class="button-print mt-2">
              <span class="button__text">Print</span>
              <span class="button__icon"><svg class="svg-pr" data-name="Layer 2" id="bdd05811-e15d-428c-bb53-8661459f9307" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
            </button>


            <button class="bin-button mt-1 ms-3" onClick={handleDelete}>
              <svg
                class="bin-top"
                viewBox="0 0 39 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                <line
                  x1="12"
                  y1="1.5"
                  x2="26.0357"
                  y2="1.5"
                  stroke="white"
                  stroke-width="3"
                ></line>
              </svg>
              <svg
                class="bin-bottom"
                viewBox="0 0 33 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_8_19" fill="white">
                  <path
                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                  ></path>
                </mask>
                <path
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                  fill="white"
                  mask="url(#path-1-inside-1_8_19)"
                ></path>
                <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                <path d="M21 6V29" stroke="white" stroke-width="4"></path>
              </svg>
            </button>

          </div>

        </li>
        <TakeAwayViewPopup
          showModal={showModal}
          handleClose={handleCloseModal}
          recipientid={recipientid}
          name={name}
          date={date}
          number={number}
          paymentType={paymentType}
          total={total}
          time={time}
          items={items}
          address={address}
          email={email}
          discount={discount}
        />

        <TakeAwayEditpopup
          showPopup={showPopup}
          handleClose={handleClosePopup}
          handleSave={handleSave}
          recipientid={recipientid}
          name={name}
          date={date}
          number={number}
          paymentType={paymentType}
          total={total}
          time={time}
          items={items}
          address={address}
          email={email}
          discount={discount}
          allVal={allVal}
        />
      </div>
    )}
    </div>
  );
}

export default TakeAwayCards;
