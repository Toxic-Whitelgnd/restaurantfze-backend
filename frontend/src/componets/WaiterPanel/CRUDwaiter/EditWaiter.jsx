import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'frontend/src/componets/WaiterPanel/CRUDwaiter/EditWaiter.css'
const EditWaiterForm = () => {
    const {waiterid} = useParams();
  const [waiterData, setWaiterData] = useState({
    waiterName: '',
    waiterNumber: '',
    address: '',
    dateOfJoining: ''
  });

  useEffect(() => {
    // Fetch waiter details by ID when the component mounts
    const fetchWaiterDetails = async () => {
      try {
        const response = await axios.get(`https://restogenius.onrender.com/get_waiter/${waiterid}`);
        console.log(response.data);
        setWaiterData(response.data);
      } catch (error) {
        console.error('Error fetching waiter details:', error);
      }
    };

    fetchWaiterDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWaiterData({
      ...waiterData,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://restogenius.onrender.com/update_waiter/${waiterid}`, waiterData);
      toast.success('Waiter details updated successfully!');
    } catch (error) {
      console.error('Error updating waiter details:', error);
      toast.error('Error updating waiter details. Please try again.');
    }
  };

  return (
    <div class='EditWaiter-Data'>
      <h2 id='EditWaiter-Data-heading'>Edit Waiter Details</h2>
      <ToastContainer />
      <form>
        <label class='EditWaiter-Data-label-1'>
          Waiter Name:
          <input 
          class='EditWaiter-Data-input-1'
          type="text" name="waiterName" value={waiterData.waiterName} onChange={handleChange} />
        </label>
        <br />
        <label class='EditWaiter-Data-label-1'>
          Waiter Number:
          <input 
          class='EditWaiter-Data-input-1'
          type="text" name="waiterNumber" value={waiterData.waiterNumber} onChange={handleChange} />
        </label>
        <br />
        <label class='EditWaiter-Data-label-1'>
          Address:
          <input 
          class='EditWaiter-Data-input-1'
          type="text" name="address" value={waiterData.address} onChange={handleChange} />
        </label>
        <br />
        <label class='EditWaiter-Data-label-1'>
          Date of Joining:
          <input 
          class='EditWaiter-Data-input-1'
          type="date" name="dateOfJoining" value={waiterData.dateOfJoining} onChange={handleChange} />
        </label>
        <br />
        <button className='EditWaiter-submit'  type="button" onClick={handleUpdate}>
          Update Waiter Details
        </button>
      </form>
    </div>
  );
};


export default EditWaiterForm;