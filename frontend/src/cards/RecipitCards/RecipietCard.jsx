import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './recipet.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const RecipietCard = () => {

    const [urlParams, setUrlParams] = useState([]);


    const dynamciurl = 'https://restogenius.onrender.com/'
    const testurl = 'https://restogenius.onrender.com/'


    var total = 0;
    useEffect(() => {
        const hash = window.location.hash;
        const params = hash.split('/').filter(param => param !== '');
        setUrlParams(params);

        FetchFoodData();
        // total = calculateTotalAmountofItem();

        FetchRecipiet();
    }, []);

    // Access the parts of the URL separately
    const firstParam = urlParams[1]; // indoor
    const secondParam = urlParams[2]; // 3

    const { id } = useParams();
    const current = window.location.href;

    const componentRef = useRef();
    const handleRecipetBill = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'FZE-Restaurant',
        onAfterPrint: () => {toast.success("Printed")
    setTimeout(() =>{
        window.location.href = '/#/';
    },2000)},
    });

   
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
            console.log(res.data.data[0]);
            setFormData(res.data.data[0]);
        } catch (error) {
            console.log("error in recipientcard");
        }
    }

    const [foodData, setFoodData] = useState([]);
    const FetchFoodData = async () => {
        try {
            const res = await axios.get(`${dynamciurl}get_customerby_order_no/${id}`);
            console.log(res.data);
            setFoodData(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const calculateTotalAmountofItem = () => {

        return foodData.items.reduce((total, item) => {
            return total + item.qty * item.price;
        }, 0);
    };

    const [tableno,setTableno] = useState(0);
    const handleTableNo = (t)=>{
        setTableno(t);
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
                                <div className="info">
                                    <h5>{formData.address}</h5>
                                </div>
                                <div className="info">
                                    <h2><strong>TAX INVOICE</strong></h2>
                                </div>
                                {/*End Info*/}
                            </center>
                            {/*End InvoiceTop*/}
                            <div className="row">
                                <div className="col">
                                    <div id="mid">
                                        <div className="info">
                                            <h2>Contact Info</h2>
                                            <p>
                                                Address : {formData.address}<br />
                                                Email : {formData.email}<br />
                                                Phone : {formData.mobilenumber}<br />
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
                                <div className="row">
                                    <center>
                                <div id="mid">
                                        <div className="info">
                                            <h2>info</h2>
                                            <p>
                                                Table no : {foodData.ordered_tableno}<br />
                                                Waiter : {foodData.waiter_name}<br />
                                                Type: {foodData.type}<br />
                                            </p>
                                        </div>
                                    </div>
                                    </center>
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
                                                <h2>U.Price</h2>
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
                                                                        {/* <div>{handleTableNo(val.table_no)}</div> */}
                                                                    </td>
                                                                    <td className="tableitem">
                                                                        <p className="itemtext">{val.price}</p>
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
                                            <tr className="tabletitle">
                                                <td />
                                                <td />
                                                <td className="Rate">
                                                    <h2>Total Before vat</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>{foodData.totalwithoutvat}</h2>
                                                </td>

                                            </tr>
                                            <tr className="tabletitle">
                                                <td />
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
                                                <td />
                                                <td className="Rate">
                                                    <h2>Discount</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>{foodData.discount}%</h2>
                                                </td>

                                            </tr>
                                            <tr className="tabletitle">
                                                <td />
                                                <td />
                                                <td className="Rate">
                                                    <h2>Grand Total</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2>AED {foodData && parseFloat(foodData.total)}</h2>
                                                </td>
                                            </tr>
                                            {/* amout paid */}
                                            <tr className="tabletitle1">
                                                <td />
                                                <td />
                                                <td className="Rate">
                                                    <h2>Payment method</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2> {foodData.paid_by}</h2>
                                                </td>
                                                
                                            </tr>
                                            <tr className="tabletitle1">
                                                <td />
                                                <td />
                                                <td className="Rate">
                                                    <h2>Amount Paid</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2> {foodData.amountpaid}</h2>
                                                </td>
                                            </tr>
                                            <tr className="tabletitle1">
                                                <td />
                                                <td />
                                                <td className="Rate">
                                                    <h2>Balance</h2>
                                                </td>
                                                <td className="payment">
                                                    <h2> {foodData.amountbalance && foodData.amountbalance === undefined ? 0 : parseFloat((foodData.amountbalance)) }</h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/*End Table*/}
                                <div id="legalcopy">
                                    <center>
                                        <p className="legal"><strong>{formData.description}</strong>&nbsp;
                                        </p>
                                    </center>
                                </div>
                                <div id="legalcopy">
                                    <center>
                                        <p className="legal"><strong>{formData.companycaption}</strong>&nbsp;
                                        </p>
                                    </center>
                                </div>
                                <div id="legalcopy">
                                    <center>
                                        <h2 className="legal"><strong>Reciept no: {foodData.receiptNo}</strong>&nbsp;
                                        </h2>
                                    </center>
                                </div>
                            </div>
                            {/*End InvoiceBot*/}
                        </div>
                        {/*End Invoice*/}



                    </div>

                    <ToastContainer />
                    {/* no to touch here */}
                    <button className='btn btn-success' onClick={handleRecipetBill}>Pay</button>
                </>


            )}

            {
                !foodData && (
                    <>
                        <h1>Add items to print the bill </h1>

                        {/* no to touch here */}
                        <button className='btn btn-success' disabled onClick={handleRecipetBill}>Pay</button>
                    </>
                )
            }


        </div>
    );
};

export default RecipietCard;
