import React, { useEffect, useState } from 'react';
import './BillEditPanel.css';
import axios from 'axios';

const BillEditPanel = () => {

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
      }, []);

    const [formData, setFormData] = useState({
        VAT: 0,
        creditSale: 0,
        discount: 0,
        cardSale: 0,
        _id:0,
      });

      const fetchData = async () => {
        try {
          const response = await axios.get('https://restogenius.onrender.com/get_billd'); // Replace with your actual endpoint
          console.log(response.data);
          setFormData(response.data[0]); // Update the form data with fetched values
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: parseFloat(value) });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.put(`https://restogenius.onrender.com/update_billd/${formData._id}`, formData);
          console.log('Data sent successfully:', response.data);
          // You can add further logic or state updates as needed
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };
    
      return (
        <div class='body'>
        <div class='vatd-1'>
          <h2 id='text-1'>Submit VAT Data</h2>
          <form onSubmit={handleSubmit} className='form-1'>
            <div class="lab-design">
            <label class='label'>
             VAT:
              <input 
                class="input"
                type="number"
                name="VAT"
                value={formData.VAT}
                onChange={handleChange}
              />
            </label >
            <br />
            <label class ='label'>
              Credit Sale:
              <input 
                class="input"
                type="number"
                name="creditSale"
                value={formData.creditSale}
                onChange={handleChange}
              />
            </label>
            <br />
            <label class="label">
              Discount:
              <input 
                class="input"
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </label>
            <br />
            <label class="label">
              Card Sale:
              <input 
                class="input"
                type="number"
                name="cardSale"
                value={formData.cardSale}
                onChange={handleChange}
              />
            </label>
            </div>
            <br />
            <button className='submit'type="submit">SAVE</button>
          </form>
        </div>
        </div>
      );
  
};

export default BillEditPanel;
