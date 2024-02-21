import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const MessDetailsForm = () => {
    const [messDetails, setMessDetails] = useState({
        joiningDate: '',
        name: '',
        mealItem1: '',
        mealItem2: '',
        mealItem3: '',
        amount: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:9999/save_messDetails", messDetails);
            console.log(result.data); // Assuming the result contains data
            console.log('Mess Details Submitted:', messDetails);
            toast.success("Data added successfully");
            setMessDetails({
                joiningDate: '',
                name: '',
                mealItem1: '',
                mealItem2: '',
                mealItem3: '',
                amount: '',
            });
        } catch (error) {
            console.error('Error submitting mess details:', error);
            toast.error("Failed to add data");
        }
    };

    return (
        <div>
            <h2>Mess Details Form</h2>
            <div className='mess-container'>
            <form onSubmit={handleSubmit}>

                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={messDetails.name}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <label>
                    Join Date:
                    <input
                        type="date"
                        name="joiningDate"
                        value={messDetails.joiningDate}
                        onChange={handleChange}
                        id="exp-input"
                    />
                </label>
                <br />

                <label>
                    Meal Frequency:
                    {/* <input
                        type="number"
                        name="mealfreq"
                        value={messDetails.mealfreq}
                        onChange={handleChange} id="exp-input"
                    /> */}
                </label>
                <br />

                <label>
                    1-Time:
                    <input
                        type="number"
                        name="mealItem1"
                        value={messDetails.mealItem1}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <label>
                    2-Time:
                    <input
                        type="number"
                        name="mealItem2"
                        value={messDetails.mealItem2}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <label>
                    3-Time:
                    <input
                        type="number"
                        name="mealItem3"
                        value={messDetails.mealItem3}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={messDetails.amount}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <button class="button2">Save </button>
                <ToastContainer />
            </form>
            </div>
        </div>
    );
};

export default MessDetailsForm;
