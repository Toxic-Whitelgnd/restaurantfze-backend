import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
<<<<<<< HEAD
=======

>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6

const HomeEdit = () => {
    const { homeno } = useParams();
    const fr = {
        home_name:'',
        home_id:'',
        home_color:'',
        home_url:'',
        home_icon:'',
    }

    const [formData, setFormData] = useState(fr);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.get(`https://restogenius.onrender.com/single_home_page/${homeno}`);
                console.log("from server hitback",response.data[0]);
                setFormData(response.data[0]);
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        // Fetch table data when the component mounts
        fetchTableData();
    }, [homeno]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            // Make a PUT request to /update_table_data/:table_no
            await axios.put(`https://restogenius.onrender.com/update_home_page_data/${homeno}`, formData);
<<<<<<< HEAD
           
            toast.success("Home item updated successfully deleted!");
=======
            toast.success('Home item updated successfully deleted!');

>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
            window.location.href = "/"
        } catch (error) {
            toast.error('Error updating table data:', error.message);
        }
    };

    return (
<<<<<<< HEAD
        <div className='Edit-table-home-panel'>
            <div className='Edit-table-home-panel-heading'>
=======
        <div>
            <ToastContainer />
>>>>>>> 0ed4b0d4c412c1f3f980055442663bb8ca4343e6
            <h1>Edit table for {homeno}</h1>
            </div>
            <div className='Edit-table-home-panel-form'>
            <form onSubmit={handleSubmit}>
                
                {/* Other input fields */}
                
                <div className="mb-3">
                    <label htmlFor="tableCapacity" className="form-label">Home Name:</label>
                    <input type="text" className="form-control" id="table_capacity" name="home_name" value={formData.home_name} onChange={handleChange} />
                </div>
                <ToastContainer/>
                <button type="submit" className="btn btn-primary">Update Table</button>
            </form>
            </div>
        </div>
    );
}

export default HomeEdit;
