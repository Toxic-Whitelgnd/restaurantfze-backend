import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './recipet.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const KitchenRecipietCard = () => {

    const [urlParams, setUrlParams] = useState([]);

    const dynamciurl = 'https://restogenius.onrender.com/'
    const testurl = 'http://localhost:9999'

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


    const { id } = useParams();
    const current = window.location.href;

    const componentRef = useRef();
    const handleRecipetBill = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'FZE-Restaurant',
        onAfterPrint: () => toast.success("Added to kitchen!"),
    });

    const [foodData, setFoodData] = useState([]);
    const FetchFoodData = async (firstParam) => {
        try {
            const res = await axios.get(`${dynamciurl}get_current_order_${firstParam}/${id}`);
            console.log(res.data);
            setFoodData(res.data);
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
        companyname:'',
            companycaption:"",
            description:"",
            address:"",
            email:"",
            mobilenumber:"",
      });

    const FetchRecipiet = async ()=>{
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
                                            <h2>Order Info</h2>
                                            <p>
                                                TableNo :{foodData.table_no}<br />
                                                OrderFrom : {foodData.orderFrom}<br />
                                                Type : {foodData.type}<br />
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col">
                                    <div id="mid">
                                        <div className="info">
                                            <h2>Date Time</h2>
                                            <p>
                                                OrderNo : #{foodData.order_no}<br />
                                                Date  : {new Date().toLocaleDateString()}<br />
                                                Time: {new Date().toLocaleTimeString()}<br />
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
                                                <h2>Item</h2>
                                            </td>
                                            <td className="Hours">
                                                <h2>Qty</h2>
                                            </td>
                                            <td className="Rate">
                                                <h2>Sub Total</h2>
                                            </td>
                                        </tr>{
                                                foodData.items && (
                                                    foodData.items.map((val, idx) => {
                                                        return (
                                                            <>
                                                                <tr className="service">
                                                                    <td className="tableitem">
                                                                        <p className="itemtext">{val.foodname}</p>
                                                                    </td>
                                                                    <td className="tableitem">
                                                                        <p className="itemtext">{val.qty}</p>
                                                                    </td>
                                                                    <td className="tableitem">
                                                                        <p className="itemtext">AED {val.price * val.qty}</p>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                )
                                            }

                                            {/* <tr className="tabletitle">
                                                <td />
                                                <td className="Rate">
                                                    <h2>VAT</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>{foodData.vat}%</h2>
                                                </td>
                                                
                                            </tr>
                                            <tr className="tabletitle">
                                                <td />
                                                <td className="Rate">
                                                    <h2>Discount</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>{foodData.discount}%</h2>
                                                </td>
                                                
                                            </tr> */}
                                            <tr className="tabletitle">
                                                <td />
                                                <td className="Rate">
                                                    <h2>Total</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>AED {foodData.total}</h2>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                </div>
                                {/*End Table*/}
                                <div id="legalcopy">
                                    <center>
                                        <p className="legal"><strong>{formData.companycaption}</strong>&nbsp;
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
                    <button className='btn btn-success' onClick={handleRecipetBill}>Add to Kitchen</button>
                </>


            )}

            {
                !foodData && (
                    <>
                        <h1>Add items to print the bill </h1>

                        {/* no to touch here */}
                        <button className='btn btn-success' disabled onClick={handleRecipetBill}>Add to kitchen</button>
                    </>
                )
            }


        </div>
    );
};

export default KitchenRecipietCard;
