import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './recipet.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const SettleSaleRecipietCard = () => {

    const [urlParams, setUrlParams] = useState([]);

    const dynamciurl = 'https://restogenius.onrender.com/'
    const testurl = 'https://restogenius.onrender.com'

    var total = 0;
    useEffect(() => {
        const hash = window.location.hash;
        const params = hash.split('/').filter(param => param !== '');
        setUrlParams(params);
        const firstParam = params[3]; // indoor or outdoor
        const secondParam = params[4]; // 3

        console.log(firstParam + ' ' + secondParam);

        FetchFoodData(firstParam);
        // total = calculateTotalAmountofItem();
        FetchRecipiet();
    }, []);


    const { date } = useParams();
    const current = window.location.href;

    const componentRef = useRef();
    const handleRecipetBill = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'FZE-Restaurant',
        onAfterPrint: () => {
            toast.success("Started to print!"),
            setTimeout(() => {
                window.location.href = '/#/settlesale';
            }, 2000)
        }
    });

    const [foodData, setFoodData] = useState([]);
    const FetchFoodData = async (firstParam) => {
        try {
            // TODO:FETCH SETTLE SALE DETAILS
            const res = await axios.get(`https://restogenius.onrender.com/${date}`);
            console.log(res.data);
            setFoodData(res.data.data[0]);
        } catch (error) {
            console.log(error.message);
        }
    }

    // FetchFoodData(firstParam);

    const calculateTotalAmountofItem = () => {

        return foodData.items.reduce((total, item) => {
            return total + item.qty * item.price;
        }, 0);
    };

    const [formData, setFormData] = useState({
        companyname: '',
        companycaption: "",
        description: "",
        address: "",
        email: "",
        mobilenumber: "",
    });

    const FetchRecipiet = async () => {
        try {
            const res = await axios.get(`${dynamciurl}get_recipiet`);
            console.log(res.data);
            setFormData(res.data.data[0]);
        } catch (error) {
            console.log("error in recipientcard");
        }
    }

    return (
        <div>


            {/* start making content here */}
            {foodData && (
                <>
                    <div ref={componentRef} >
                        {/* TODO: DYNAMIC */}
                        <div id="invoice-POS">
                            <center id="top">
                                <div className="logo" />
                                <div className="info">
                                    <h2>{formData.companyname}</h2>
                                </div>
                                {/*End Info*/}
                            </center>
                            {/*End InvoiceTop*/}
                            <div className="row">
                                <div className="col">
                                    <div id="mid">
                                        <div className="info">
                                            <h2>Settelsale Info</h2>
                                            <p>
                                                Date: {foodData.date} <br />
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            {/*End Invoice Mid*/}
                            <div id="bot">
                                <div id="table">
                                    <table>
                                        <tbody><tr className="tabletitle">
                                            <td className="item">
                                                <h2>Sale Details</h2>
                                            </td>
                                            <td className="Hours">
                                                <h2></h2>
                                            </td>
                                            <td className="Rate">
                                                <h2>Total</h2>
                                            </td>
                                        </tr>

                                            <tr className="service">
                                                <td className="tableitem">
                                                    <p className="itemtext">cashAtStarting</p>
                                                </td>
                                                <td className="tableitem">
                                                    <p className="itemtext"></p>
                                                </td>
                                                <td className="tableitem">
                                                    <p className="itemtext">{foodData.cashAtStarting}</p>
                                                </td>
                                            </tr>

                                            <tr className="service">
                                                <td className="tableitem">
                                                    <p className="itemtext">cashSale</p>
                                                </td>
                                                <td className="tableitem">
                                                    <p className="itemtext"></p>
                                                </td>
                                                <td className="tableitem">
                                                    <p className="itemtext">{foodData.cashSale}</p>
                                                </td>
                                            </tr>

                                            <tr className="service">
                                                <td className="tableitem">
                                                    <p className="itemtext">creditRecoverySale</p>
                                                </td>
                                                <td className="tableitem">
                                                    <p className="itemtext"></p>
                                                </td>
                                                <td className="tableitem">
                                                    <p className="itemtext">{foodData.creditRecoverySale}</p>
                                                </td>
                                            </tr>




                                            <tr className="tabletitle">
                                                <td />
                                                <td className="Rate">
                                                    <h2>Total</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>AED {foodData.cashAtStarting + foodData.creditRecoverySale + foodData.cashSale}</h2>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                </div>
                                {/*End Table*/}
                                <div id="legalcopy">
                                    <center>
                                        <p className="legal"><strong>{formData.description}</strong>&nbsp;
                                        </p>
                                    </center>
                                </div>
                            </div>
                            {/*End InvoiceBot*/}
                        </div>
                        {/*End Invoice*/}



                    </div>

                    <ToastContainer />
                    {/* no to touch here */}
                    <button className='btn btn-success' onClick={handleRecipetBill}>Print</button>
                </>


            )}

            {
                !foodData && (
                    <>
                        <h1>Check the settle sale </h1>

                    </>
                )
            }


        </div>
    );
};

export default SettleSaleRecipietCard;
