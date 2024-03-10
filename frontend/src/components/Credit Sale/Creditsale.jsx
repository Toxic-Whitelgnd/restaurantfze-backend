import React, { useEffect, useRef, useState } from 'react';
import "./creditsale.css";
import SaleOrderApi from '../api/sodapi';
import CScards from '../../cards/CreditSaleCards/CScards';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Creditsale = () => {

    const [sodata, setSodata] = useState([]);

    useEffect(() => {
        fetchCreditSaleData();
    }, []);

    const fetchCreditSaleData = async () => {
        try {
            const res = await axios.get(`http://localhost:9999/get_creditsale`);
            console.log(res.data);
            setSodata(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const [saletype, setSaletype] = useState('all');
    const handleSalestate = (e) => {
        setSaletype(e.target.value)
    }

    const [cards, setCard] = useState('all');
    const handleCard = (e) => {
        setCard(e.target.value);
    }



    const [recipientIdFilter, setRecipientIdFilter] = useState('');

    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleSearch = (e) => {
        setRecipientIdFilter(e.target.value);


    };

    const [fls, setFls] = useState('');

    const handleFilterRec = () => {
        sortTableData(saletype);

    }

    // Function to sort table data
    const sortTableData = (IorD) => {
        const sortedData = [...sodata];
        if (IorD === "hightolow") {
            sortedData.sort((a, b) => b.total - a.total);
        }
        else if (IorD === "lowtohigh") {
            sortedData.sort((a, b) => a.total - b.total)
        }
        else {
            sortedData.sort((a, b) => b.total - a.total);
        }



        setSodata(sortedData);
    };

    const handleReceive = async (cust) => {
        console.log("check this customer", cust.customer_name);
        if (cust.type === "dinein") {
            try {
                const res = await axios.put(`http://localhost:9999/update_creditsale_dineincustomerdetails/${cust._id}`, {
                    amountpaid: cust.total,
                    date: new Date().toLocaleDateString(),
                });
                if (res.data.success) {
                    toast.success("Credit sale was successfully updated");
                    setTimeout(()=>{
                        window.location.reload();
                    },2000)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        else if (cust.type === "deliverysale") {
            try {
                const res = await axios.put(`http://localhost:9999/update_creditsale_deliverysalecustomerdetails/${cust._id}`, {
                    amountpaid: cust.total,
                    date: new Date().toLocaleDateString(),
                });
                if (res.data.success) {
                    toast.success("Credit sale was successfully updated");
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        else if (cust.type === "countersale") {
            try {
                const res = await axios.put(`http://localhost:9999/update_creditsale_takeawaysalecustomerdetails/${cust._id}`, {
                    amountpaid: cust.total,
                    date: new Date().toLocaleDateString(),
                });
                if (res.data.success) {
                    toast.success("Credit sale was successfully updated");
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }



    return (
        <div>
            <h1 className='text-center'>Credit sale details</h1>
            <ToastContainer />
            <div className='food-category-bar-1'>

                <div className='foo-cat'>

                    <input type="text" placeholder="Name" className="form__input" id="name"
                        value={recipientIdFilter}
                        // onChange={(e) => setRecipientIdFilter(e.target.value)}
                        onChange={handleSearch}
                        ref={inputRef}

                        onFocus={handleFocus}
                        onBlur={handleBlur}

                    />

                    <label for="name" class="form__label">Find by OrderNo</label>

                </div>

                <div className='foo-cat-1'>
                    <span htmlFor="foodCategory">Sort by :</span>
                    <select id="foodCategory-1" onChange={handleSalestate} value={saletype}>
                        <option value="all">All</option>
                        <option value="hightolow">HighToLow</option>
                        <option value="lowtohigh">LowToHigh</option>
                    </select>

                </div>
                {/* <div className='foo-cat-1'>
                    <span htmlFor="foodCategory">Sort by Card:</span>
                    <select id="foodCategory-1" onChange={handleCard} value={cards}>
                        <option value="all">All</option>
                        <option value="credit">Credit</option>
                        <option value="balancetopay">BalanceToPay</option>
                    </select>
                </div> */}

                <div>
                    <button onClick={handleFilterRec} className="btn-fl"><i class="animation"></i>Filter<i class="animation"></i>
                    </button>
                </div>


            </div>

            <div className='orderCont'>

                <ul class="responsive-table">
                    <li class="otable-header">
                        <div class="colo colo-3">Customer Name</div>
                        <div class="colo colo-1">OrderNo</div>
                        <div class="colo colo-4">Credit Amt</div>
                        <div class="colo colo-3">BalanceTopay</div>
                        <div class="colo colo-3">Action</div>
                    </li>
                    {/* only three parameter is passed as it should contin only total,discount,net total */}
                    {
                        //fls &&fls
                        sodata && sodata.filter((x) =>
                        x.order_no.toString().includes(recipientIdFilter)).map((val, idx) => {
                            return (
                                <>
                                    <CScards
                                        key={idx}
                                        name={val.customer_name}
                                        recipientid={val.order_no}
                                        creditamt={val.total}
                                        balancetopay={val.total - val.amountpaid}
                                        handleReceive={handleReceive}
                                        custData={val}
                                    />

                                </>
                            )
                        })
                    }


                </ul>

            </div>

        </div>

    );
}

export default Creditsale;
