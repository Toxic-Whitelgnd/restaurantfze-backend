// src/TableForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TableForm = () => {
   
  
    
    const fr = {
        table_no: '',
    table_id: '', //`${table_no}`
    table_capacity: '',
    table_taken: '0',
    table_pploccupied: '0',
    table_itemsordered: '0',
    table_type: 'indoor', // Default value
    table_color: '#009946',
    table_url: '', //`/${table_type === 'indoor'?'itable':'otable'}/${table_no}`
    }

  const [formData, setFormData] = useState(fr);

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });


  };

  const handleManualUpdate = () => {
    // Manually set tableId to be the same as tableNo
    setFormData({ ...formData, table_id: formData.table_no });
    
  };

  const handleUrl = () =>{
    var tableurl = formData.table_type === 'indoor' ? `/itable/${formData.table_no}`:`/otable/${formData.table_no}`
    setFormData({ ...formData, table_url: tableurl});
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
  

      console.log(formData);
    try {
      // Make a POST request to /post_table_data API
      
      await axios.post('https://restogenius.onrender.com/post_table_data', formData);

      // Optionally, you can add logic to handle success or navigate to another page
      console.log('Table data successfully submitted!');
      alert("Table added successfully!");
    } catch (error) {
      console.error('Error submitting table data:', error);
    }
  };

  return (
    <div>
        <h1>Add your Table Here</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Table Type:
        <select name="table_type" value={formData.table_type} onChange={handleChange}>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </label>
      <br></br>
      <label>
        Table Number:
        <input type="number" name="table_no" value={formData.table_no} onChange={handleChange} />
      </label>
      <br></br>
      <label>
        Table Capacity:
        <input type="number" name="table_capacity" value={formData.table_capacity} onChange={handleChange} />
      </label>
      <br></br>
      <button type="button" className="btn btn-secondary" onClick={handleManualUpdate}>
          Set ID 
        </button>
        <br></br>
        <button type="button" className="btn btn-secondary" onClick={handleUrl}>
          Set URL
        </button>
        <br></br>
   
      
      

      <button type="submit">Create Table</button>
    </form>
    </div>
  );
};

export default TableForm;
