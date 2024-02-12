import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
      alert('Waiter details updated successfully!');
    } catch (error) {
      console.error('Error updating waiter details:', error);
      alert('Error updating waiter details. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Waiter Details</h2>
      <form>
        <label>
          Waiter Name:
          <input type="text" name="waiterName" value={waiterData.waiterName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Waiter Number:
          <input type="text" name="waiterNumber" value={waiterData.waiterNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={waiterData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date of Joining:
          <input type="date" name="dateOfJoining" value={waiterData.dateOfJoining} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>
          Update Waiter Details
        </button>
      </form>
    </div>
  );
};


export default EditWaiterForm;