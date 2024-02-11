import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const MessDetailsForm = () => {
    const [messDetails, setMessDetails] = useState({
        idno: '',
        joindate: '',
        closingdate: '',
        custname: '',
        time1: '',
        time2: '',
        time3: '',
        amount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can save the details to your desired location (e.g., database, state, etc.)
        console.log('Mess Details Submitted:', messDetails);
        // Reset the form after submission
        toast.success("data added successfully")

        setMessDetails({
            idno: '',
            joindate: '',
            closingdate: '',
            custname: '',
            time1: '',
            time2: '',
            time3: '',
            amount: '',
        });
    };

    return (
        <div>
            <h2>Mess Details Form</h2>
            <div className='mess-container'>
            <form onSubmit={handleSubmit}>
                <label>
                    ID Number:
                    <input
                        type="text"
                        name="idno"
                        value={messDetails.idno}
                        onChange={handleChange}
                        id="exp-input"
                    />
                </label>
                <br />

                <label>
                    Name:
                    <input
                        type="text"
                        name="custname"
                        value={messDetails.custname}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <label>
                    Join Date:
                    <input
                        type="date"
                        name="joindate"
                        value={messDetails.joindate}
                        onChange={handleChange}
                        id="exp-input"
                    />
                </label>
                <br />

                <label>
                    Closing Date:
                    <input
                        type="date"
                        name="closingdate"
                        value={messDetails.closingdate}
                        onChange={handleChange} id="exp-input"
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
                        name="time1"
                        value={messDetails.time1}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <label>
                    2-Time:
                    <input
                        type="number"
                        name="time2"
                        value={messDetails.time2}
                        onChange={handleChange} id="exp-input"
                    />
                </label>
                <br />

                <label>
                    3-Time:
                    <input
                        type="number"
                        name="time3"
                        value={messDetails.time3}
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
