import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function CashStarting() {
  const [selectedDate, setSelectedDate] = useState('');
  const [cash, setCash] = useState('');
  const [cashid, setCashid] = useState('');
  const [updateCash,setUpdateCash] = useState(false);
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
        const res = await axios.get(`https://restogenius.onrender.com/get_cashatstarting`);
        console.log(res.data);
        if(res.data != null){
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

  const handleSave = () => {
    // Here you can add code to handle saving the data
    console.log('Date:', selectedDate);
    console.log('Cash:', cash);
    const datacash = {cash: cash, selectedDate: selectedDate };
    // Reset form after saving
    const res = axios.post('https://restogenius.onrender.com/add_cashatstarting', datacash);
    if(res.data.success) {
        toast.success("Cash added successfully")
    }

    setSelectedDate('');
    setCash('');
  };

  const handleUpdate = async () => {
    // Here you can add code to handle saving the data
    console.log('Date:', selectedDate);
    console.log('Cash:', cash);
    const data = {cash: cash, selectedDate: selectedDate };
    // Reset form after saving
    const res = await axios.put(`https://restogenius.onrender.com/update_cashatstarting/${cashid}`, data);
    console.log("from res",res);
    if(res.data.success) {
        toast.success("Cash updated successfully")
        setTimeout(()=>{
            window.location.reload();
        },2000)
    }

    setSelectedDate('');
    setCash('');
  };

  

  return (
    <div>
        {!updateCash && !updateCash ? (
            <>
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
          type="number"
          id="cashInput"
          value={cash}
          onChange={handleCashChange}
        />
        <br />
        <button type="button" onClick={handleSave}>Save</button>
      </form>
            </>
        ) : (
            <>
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
          type="number"
          id="cashInput"
          value={cash}
          onChange={handleCashChange}
        />
        <br />
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
            </>
        )}
      
    </div>
  );
}

export default CashStarting;
