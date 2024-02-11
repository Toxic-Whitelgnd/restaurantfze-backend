import React, { useState } from 'react';
import "./Expenses.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Expenses = () => {

    const [formData, setFormData] = useState({
        trnNo: '',
        companyName: '',
        purchaseDate: '',
        invoiceNo: '',
        vat: '5',
        description: '',
        category: 'General',
        subTotal: 0,
        vatAmount: 0,
        netTotal: 0,
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();




        if (formData.trnNo === '') {
            toast.error("Please Fill the details")
        }
        else {
            console.log('Form data submitted:', formData);
            toast.success('Data Saved Successfully')

        }


        // Perform any additional logic or save data as needed




        // Reset form after submission
        setFormData({
            trnNo: '',
            companyName: '',
            purchaseDate: '',
            invoiceNo: '',
            vat: '',
            description: '',
            category: 'General',
            subTotal: 0,
            vatAmount: 0,
            netTotal: 0,
        });
    };

    return (
        <div>
            <h3 className='d-flex justify-content-center'>Expenses</h3>
            <div className="invoice-form-container mt-3">

                <form onSubmit={handleFormSubmit}>
                    {/* Add your form fields here */}
                    <label>
                        TRN No:
                        <input id="exp-input" type="text" name="trnNo" value={formData.trnNo} onChange={handleInputChange} />
                    </label>
                    {/* Repeat similar structure for other fields */}
                    <label>
                        Company Name:
                        <input id="exp-input" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
                    </label>
                    <label>
                        Purchase Date:
                        <input id="exp-input" type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} />
                    </label>
                    <label>
                        Invoice No:
                        <input id="exp-input" type="text" name="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} />
                    </label>
                    <label>
                        VAT %:
                        <input id="exp-input" type="text" name="vat" value={formData.vat} onChange={handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <input id="exp-input" type="text" name="description" value={formData.description} onChange={handleInputChange} />
                    </label>

                    <label>
                        Category:
                        <select id="exp-input" name="category" value={formData.category} onChange={handleInputChange}>
                            <option value="General Things">General Things</option>
                            <option value="Company Things">Company Things</option>
                            <option value="Private Thinfs">Private Things</option>
                            {/* Add other options as needed */}
                        </select>
                    </label>

                    <label>
                        Sub Total:
                        <input id="exp-input" type="number" name="subTotal" value={formData.subTotal} onChange={handleInputChange} />
                    </label>

                    <label>
                        VAT Amount:
                        <input id="exp-input" type="number" name="vatAmount" value={formData.vatAmount} onChange={handleInputChange} />
                    </label>

                    <label>
                        Net Total:
                        <input id="exp-input" type="number" name="netTotal" value={formData.netTotal} onChange={handleInputChange} />
                    </label>

                    <button type='sumbit' class="learn-more">
                        <span class="circle" aria-hidden="true">
                            <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Save Details <ToastContainer /></span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Expenses;
