import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
            // Make a DELETE request to /delete_table_data/:table_no
            await axios.delete(`https://restogenius.onrender.com/delete_home_page_data/${homeno}`);
            
            toast.success('Home item deleted successfully deleted!');
            
            window.location.href = '/';
          } catch (error) {
            toast.error('Error deleting table:', error);
          }
        };

        return (
            <div className="container mt-4">
              <div className='home-delete-table'>
                <div className='home-delete-table-heading'>
                  <ToastContainer />
                  <h1>Delete Table {homeno}</h1>
                </div>
                <div className='home-delete-table-page'>
                  <p>Are you sure you want to delete Home page (might leads to error)?</p>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Delete Home Page
                  </button>
                </div>
              </div>
            </div>
          );
        };

export default HomeEdit;
