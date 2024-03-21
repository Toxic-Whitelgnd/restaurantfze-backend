import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "./cashstarting.css";

function CashStarting() {
  const [selectedDate, setSelectedDate] = useState('');
  const [cash, setCash] = useState('');
  const [cashid, setCashid] = useState('');
  const [updateCash, setUpdateCash] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://restogenius.onrender.com/get_cashatstarting`);
      console.log(res.data);
      if (res.data != null) {
        setSelectedDate(res.data.selectedDate);
        setCash(res.data.cash);
        setUpdateCash(true);
        setCashid(res.data._id);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCashChange = (event) => {
    setCash(event.target.value);
  };

  const handleSave = async () => {
    try {
      const datacash = { cash: cash, selectedDate: selectedDate };
      const res = await axios.post('https://restogenius.onrender.com/add_cashatstarting', datacash);
      if (res.data.success) {
        toast.success("Cash added successfully");
        setSelectedDate('');
        setCash('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = { cash: cash, selectedDate: selectedDate };
      const res = await axios.put(`https://restogenius.onrender.com/update_cashatstarting/${cashid}`, data);
      if (res.data.success) {
        toast.success("Cash updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!updateCash && !cashid ? (
        <div className='cashstarting-form'>
          <form>
            <ToastContainer />
            <label htmlFor="datePicker" id='cashstarting-label-1'>Select Date:</label>
            <input
              type="date"
              id="datePicker"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <br />
            <label htmlFor="cashInput" id='cashstarting-label-2'>Cash at Starting:</label>
            <input
            class="custom-number-input"
              type="number"
              id="cashInput"
              value={cash}
              onChange={handleCashChange}
            />
            <br />
            <button type="button" onClick={handleSave}>Save</button>
          </form>
        </div>
      ) : (
        <div className='cashstarting-form'>
          <form>
            <ToastContainer />
            <label htmlFor="datePicker">Select Date:</label>
            <input
              type="date"
              id="datePicker"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <br />
            <label htmlFor="cashInput">Cash at Starting:</label>
            <input
              class="custom-number-input"
              type="number"
              id="cashInput"
              value={cash}
              onChange={handleCashChange}
            />
            <br />
            <button type="button" onClick={handleUpdate}>Update</button>
          </form>
        </div>
      )}

    </div>
  );
}

export default CashStarting;
