import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './AddWaiter.css';
const AddWaiter = () => {

    const [waiterData, setWaiterData] = useState({
        waiterName: '',
        waiterNumber: '',
        address: '',
        dateOfJoining: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setWaiterData({
          ...waiterData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log(waiterData.dateOfJoining);
          const res = await axios.post('https://restogenius.onrender.com/add_waiter_details', waiterData);
          if(res.data){
           toast.success('Waiter added successfully!');
          }
          
          setWaiterData({
            waiterName: '',
            waiterNumber: '',
            address: '',
            dateOfJoining: ''
          });
        } catch (error) {
          console.error('Error adding waiter:', error);
          toast.error('Error adding waiter. Please try again.');
        }
      };

    return (
        <div class='Addwaiter-Data'>
         <h2 id='Addwaiter-Data-heading'>Add Waiter</h2>
         <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label class='Addwaiter-Data-label-1'>
          Waiter Name:
          <input 
          class='Addwaiter-Data-input-1'
          type="text" name="waiterName" value={waiterData.waiterName} onChange={handleChange} />
        </label>
        <br />
        <label  class='Addwaiter-Data-label-1'>
          Waiter PhoneNumber:
          <input
          class='Addwaiter-Data-input-1'
          type="text" name="waiterNumber" value={waiterData.waiterNumber} onChange={handleChange} />
        </label>
        <br />
        <label class='Addwaiter-Data-label-1'>
          Address:
          <br  />
          <input
          class='Addwaiter-Data-input-1' type="text" name="address" value={waiterData.address} onChange={handleChange} />
        </label>
        <br />
        <label  class='Addwaiter-Data-label-1'>
          Date of Joining:
          <input 
          class='Addwaiter-Data-input-1'
          type="date" name="dateOfJoining" value={waiterData.dateOfJoining} onChange={handleChange} />
        </label>
        <br />
        <button className='Addwaiter-submit'  type="submit">Add Waiter</button>
      </form>
    </div>
  );
};

export default AddWaiter;
