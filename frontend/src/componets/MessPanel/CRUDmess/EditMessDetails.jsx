import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditMessForm = () => {
    const {messid} = useParams();
    const [messData, setMessData] = useState({
      joiningDate: null,
      name: null,
      closingDate: null,
      mobileNumber: null,
      mealItem1: null,
      mealItem2: null,
      mealItem3: null,
      amount: null,
    });
    

  useEffect(() => {
    // Fetch mess  details by ID when the component mounts
    const fetchMessDetails = async () => {
      try {
        const response = await axios.get(`https://restogenius.onrender.com/get_messDetails/${messid}`);
        setMessData({ ...response.data[0],
          joiningDate: response.data[0].joiningDate ? formatDate(response.data[0].joiningDate) : null,
          closingDate: response.data[0].closingDate ? formatDate(response.data[0].closingDate) : null});
      } catch (error) {
        console.error('Error fetching mess details:', error);
      }
    };

    fetchMessDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessData({
      ...messData,
      [name]: value
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
};

  const handleUpdate = async () => {
    try {
      await axios.put(`https://restogenius.onrender.com/update_messDetails/${messid}`, messData);
      alert('Mess details updated successfully!');
    } catch (error) {
      console.error('Error updating mess details:', error);
      alert('Error updating mess details. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Mess Details </h2>
      <form>
        <label>
        Name:
          <input type="text" name="name" value={messData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mobile Number:
          <input type="tel" name="mobileNumber" value={messData.mobileNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date of Joining:
          <input type="date" name="joiningDate" value={messData.joiningDate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date of Closing:
          <input type="date" name="closingDate" value={messData.closingDate} onChange={handleChange} />
        </label>
        <br />
        
        <label>
          Meal 1:
          <input type="number" name="mealItem1" value={messData.mealItem1} onChange={handleChange} />
        </label>
        <br />
        
        <label>
          Meal 2:
          <input type="number" name="mealItem2" value={messData.mealItem2} onChange={handleChange} />
        </label>
        <br />
        
        <label>
          Meal 3:
          <input type="number" name="mealItem3" value={messData.mealItem3} onChange={handleChange} />
        </label>
        <br />

        <label>
          Amount:
          <input type="number" name="amount" value={messData.amount} onChange={handleChange} />
        </label>
        <br/>

        <button type="button" onClick={handleUpdate}>
          Update Mess Details
        </button>
      </form>
    </div>
  );
};


export default EditMessForm;