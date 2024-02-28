import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function EditRecipietPanel() {
  const [companyname, setcompanyname] = useState('');
  const [address, setAddress] = useState('');
  const [companycaption, setcompanycaption] = useState('');
  const [description, setDescription] = useState('');

  const [formData, setFormData] = useState({
    companyname:'',
        companycaption:"",
        description:"",
        address:"",
        email:"",
        mobilenumber:"",
  });

  useEffect(()=>{
        fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9999/get_recipiet'); // Replace with your actual endpoint
      console.log(response.data);
      setFormData(response.data.data[0]); // Update the form data with fetched values
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {


      console.log(formData);

      // Assuming your backend API endpoint for updating is '/api/billReceipt/:id'
      const response = await axios.put(`http://localhost:9999/update_recipiet/${formData._id}`, formData);

      console.log('Updated receipt:', response.data.data);
      if(response.data.success){
        toast.success("Recipiet updates successfully");
      }
  
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error updating receipt:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Update Bill Receipt</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyname">Restaurant Name:</label>
          <input
            type="text"
            name="companyname"
            value={formData.companyname}
            onChange={ handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={ handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="address">Email:</label>
          <textarea
            name="email"
            value={formData.email}
            onChange={ handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="address">Mobileno:</label>
          <textarea
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={ handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="companycaption">Kitchen description:</label>
          <input
            type="text"
            name="companycaption"
            value={formData.companycaption}
            onChange={ handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={ handleChange}
          ></textarea>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditRecipietPanel;
