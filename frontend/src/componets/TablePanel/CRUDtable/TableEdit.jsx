import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './TableEdit.css';

const TableEdit = () => {
    const { tableno } = useParams();
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

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.get(`https://restogenius.onrender.com/single_table_data/${tableno}`);
                console.log("from server hitback",response.data[0]);
                setFormData(response.data[0]);
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        // Fetch table data when the component mounts
        fetchTableData();
    }, [tableno]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            // Make a PUT request to /update_table_data/:table_no
            await axios.put(`https://restogenius.onrender.com/update_table_data/${tableno}`, formData);
            console.log('Table data successfully updated!');
            toast.success(`Table data successfully updated!`);
            // Optionally, you can add logic to handle success or navigate to another page
        } catch (error) {
            console.error('Error updating table data:', error.message);
            toast.error(`Error updating table data: ${error.message}`);
        }
    };

    return (
        <div className='edit-table-body'>
            <h1 id='edit-table-body-heading'>Edit Table For {tableno}</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                   
                    <label htmlFor="tableType" className="edit-table-form-label">Table Type:</label>
                    <select className="edit-table-form-select" id="table_type" name="table_type" value={formData.table_type} onChange={handleChange}>
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                    </select>
                    
                </div>
                {/* Other input fields */}
                {/* <div className="mb-3">
                    <label htmlFor="tableNo" className="form-label">Table Number:</label>
                    <input type="text" className="form-control" id="table_no" name="table_no" value={formData.table_no} onChange={handleChange} />
                </div> */}
                <div className="mb-3">
                    <label htmlFor="tableCapacity" className="edit-table-form-label">Table Capacity:</label>
                    <input type="text" className="edit-table-form-control" id="table_capacity" name="table_capacity" value={formData.table_capacity} onChange={handleChange} />
                </div>
   
                <button type="submit" className="btn btn-primary">Update Table</button>
            </form>
        </div>
    );
}

export default TableEdit;
