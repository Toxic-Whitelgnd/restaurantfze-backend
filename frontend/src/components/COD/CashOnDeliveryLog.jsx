import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CashOnDeliveryLog = () => {
    const [recipientIdFilter, setRecipientIdFilter] = useState('');

    useEffect(() => {
        fetchCODdata();
    }, []);

    const [codData, setCodData] = useState([]);
    const fetchCODdata = async () => {
        try {
            const res = await axios.get(`https://restogenius.onrender.com/get_codlog`);
            console.log(res.data);
            setCodData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }

    }

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

        try {
            const ans = codData.filter((x) =>
                x.order_no.toString().includes(recipientIdFilter));
            setFls(ans);
        } catch (error) {
            toast.warn("Enter something to filter")
        }



    }

    const clearThesearch = () => {
        setRecipientIdFilter('');
        setFls('');
    }
    return (
        <div>
            <div>
                <h1 className='text-center mt-2'>Cash on Delivery Log</h1>
                <div className='food-category-bar-1'>

                    <div className='foo-cat'>

                        {/* <label for="name" class="form__label">Find by RecipientID</label> */}
                        <input type="text" placeholder="Find by order_no" id="name"
                            value={recipientIdFilter}
                            // onChange={(e) => setRecipientIdFilter(e.target.value)}
                            onChange={handleSearch}
                            ref={inputRef}

                            onFocus={handleFocus}
                            onBlur={handleBlur}

                        />
                        <ToastContainer />


                    </div>

                    <div>
                        <button onClick={handleFilterRec} className="btn-fl"><i class="animation"></i>Filter<i class="animation"></i>
                        </button>
                    </div>

                    <div>
                        <button onClick={clearThesearch} className="btn-fl"><i class="animation"></i>Clear<i class="animation"></i>
                        </button>
                    </div>

                </div>
                <div className='orderCont-tkl'>

                    <ul class="responsive-table">
                        <li class="otable-header">
                            <div class="colo colo-1-tk">Recipient Id</div>
                            <div class="colo colo-1-tk">Type</div>
                            <div class="colo colo-1-tk">Customer Name</div>
                            <div class="colo colo-1-tk">Date</div>
                            <div class="colo colo-1-tk">Total</div>
                            {/* <div class="colo colo-4-tk">Action</div> */}

                        </li>
                        {/* only three parameter is passed as it should contin only total,discount,net total */}
                        {fls === '' ? codData && codData.map((val, idx) => {
                            return (
                                <>
                                    <li class="otable-row-ss" >

                                        <div class="colo colo-1-tk" data-label="Job Id">{val.order_no}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.type}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.customer_name}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.date}{val.time}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.total}</div>
                                    </li>

                                </>
                            )
                        }):''}
                        {fls !== ''? fls && fls.map((val, idx) => {
                            return (
                                <>
                                    <li class="otable-row-ss" >

                                        <div class="colo colo-1-tk" data-label="Job Id">{val.order_no}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.type}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.customer_name}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.date}{val.time}</div>
                                        <div class="colo colo-1-tk" data-label="Payment Status">{val.total}</div>
                                    </li>

                                </>
                            )
                        }):''}




                    </ul>

                </div>
            </div>
        </div>
    );
}

export default CashOnDeliveryLog;
