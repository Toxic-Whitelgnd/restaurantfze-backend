import React, { useEffect, useRef, useState } from 'react';
import "./CRM.css";
import SaleOrderApi from '../api/sodapi';
import CRMCards from '../../cards/CRMCards/CRMCards';
import MessApi from '../api/messapi';
import MessCards from '../../cards/CRMCards/MessCards';
import axios from 'axios';


// for active customers
const ActiveCustomer = ({ data, currmonth }) => (
    <div>
        <h1 className='text-center mt-2'>Active customer list</h1>
        <p className='text-center mt-2'>Active Customers in the Last 3 Months</p>
        <div className='orderCont'>

            <ul class="responsive-table">
                <li class="otable-header">
                    <div class="colo colo-3">Customer Name</div>
                    <div class="colo colo-4">Customer Number</div>
                    <div class="colo colo-4">Customer email</div>
                    <div class="colo colo-4">Status</div>
                </li>
                {/* only three parameter is passed as it should contin only total,discount,net total */}
                {
                    // hashmap table or dictionary
                    data && data.filter(
                        (x) => {
                            const purchasedate = new Date(x.date).toLocaleDateString('en-US');
                            console.log("from activecustomer", purchasedate, currmonth, x.customer_name);
                            const date1 = new Date(purchasedate);
                            const date2 = new Date(currmonth);

                            console.log(date1 > date2);
                            return date1 >= date2
                        }

                    ).map((val, idx) => {
                        return (
                            <>
                                <CRMCards
                                    name={val.customer_name}
                                    status='active Customer'
                                    number={val.customer_mobileNumber}
                                    email={val.type}
                                />
                            </>
                        )
                    })
                }


            </ul>

        </div>
    </div>
);

// for inactive customers
const InactiveCustomer = ({ data, currmonth }) => (
    <div>
        <h1 className='text-center mt-2'>InActive customer list</h1>
        <p className='text-center mt-2'>InActive Customers in the Last 3 Months</p>
        <div className='orderCont'>

            <ul class="responsive-table">
                <li class="otable-header">
                    <div class="colo colo-3">Customer Name</div>
                    <div class="colo colo-4">Customer Number</div>
                    <div class="colo colo-4">Customer email</div>
                    <div class="colo colo-4">Status</div>
                </li>
                {/* only three parameter is passed as it should contin only total,discount,net total */}
                {
                    // hashmap table or dictionary
                    data && data.filter(
                        (x) => {
                            const purchasedate = new Date(x.date).toLocaleDateString('en-US');
                            console.log(purchasedate, currmonth);
                            const date1 = new Date(purchasedate);
                            const date2 = new Date(currmonth);

                            console.log(date1 > date2);
                            return date1 <= date2
                        }

                    ).map((val, idx) => {
                        return (
                            <>
                                <CRMCards
                                    name={val.customer_name}
                                    status='inactive Customer'
                                    number={val.customer_mobileNumber}
                                    email={val.type}
                                />
                            </>
                        )
                    })
                }


            </ul>

        </div>
    </div>
);

// for top customers
const TopCustomer = ({ data, currmonth, repeatedNumbers, counts }) => (
    <div>
        <h1 className='text-center mt-2'>Top customer list</h1>
        <p className='text-center mt-2'>Customer who purchased more than 2 times</p>
        <div className='orderCont'>

            <ul class="responsive-table">
                <li class="otable-header">
                    <div class="colo colo-3">Customer Name</div>
                    <div class="colo colo-4">Customer Number</div>
                    <div class="colo colo-4">Customer email</div>
                    <div class="colo colo-4">Status</div>
                </li>
                {/* only three parameter is passed as it should contin only total,discount,net total */}
                
                {
                    // hashmap table or dictionary

                    data && data.filter(x => counts[x.customer_mobileNumber] >= 2).map((val, idx) => {
                        return (
                            <CRMCards
                                name={val.customer_name}
                                status='Top Customer'
                                number={val.customer_mobileNumber}
                                email={val.type}
                            />
                        )
                    })
                }


            </ul>

        </div>

    </div>
);

// for mess customer
const MessCustomer = ({ data, currmonth, messdata }) => {
    var time1total = 0;
    var time2total = 0;
    var time3total = 0;

    const days = 22;
    messdata.forEach(x => {
        const formattedStartDate = new Date(x.joiningdate);
        const formattedEndDate = new Date(x.closingdate);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = formattedEndDate - formattedStartDate;

        // Calculate the difference in days
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        if (x.mealfreq === '1time') {

            time1total += x.amount * differenceInDays;
            // console.log("time 1 total: " + number(time1total));
        }
        else if (x.mealfreq === '2time') {
            time2total += x.amount * differenceInDays;
        }
        else if (x.mealfreq === '3time') {
            time3total += x.amount * differenceInDays;
        }
    });

    return (

        <div>
            <h1 className='text-center mt-2'>Mess Customer</h1>
            <p className='text-center mt-2'>based on the amt calculated is based on diff in days of joiningdate and closing date</p>
            <div className='orderCont'>

                <ul class="responsive-table">
                    <li class="otable-header">
                        <div class="colo colo-3">ID NO</div>
                        <div class="colo colo-3">Customer Name</div>
                        <div class="colo colo-4">1 time</div>
                        <div class="colo colo-4">2 time</div>
                        <div class="colo colo-4">3 time</div>
                        <div class="colo colo-4">Days</div>
                    </li>
                    {/* only three parameter is passed as it should contin only total,discount,net total */}
                    {
                        // hashmap table or dictionary

                        messdata && messdata.map((val, idx) => {
                            return (
                                <MessCards
                                    name={val.customer_name}
                                    mealfreq={val.mealfreq}
                                    idno={val.idno}
                                    amt={val.amount}
                                    joiningdate={val.joiningdate}
                                    closingdate={val.closingdate}
                                />
                            )
                        })
                    }
                    <li class="otable-header">
                        <div class="colo colo-3"></div>
                        <div class="colo colo-3"></div>
                        <div class="colo colo-4">Total:{time1total}</div>
                        <div class="colo colo-4">Total:{time2total}</div>
                        <div class="colo colo-4">Total:{time3total}</div>
                        <div class="colo colo-4"></div>
                    </li>


                </ul>

            </div>

        </div>
    )
}



const CRM = () => {
    const [sodata, setSodata] = useState(SaleOrderApi);

    useEffect(() => {
        fetchData();
    }, []);

    const dynamicurl = `https://restogenius.onrender.com/`;

    const fetchData = async () => {
        try {
            const res = await axios.get(`${dynamicurl}get_customer_details`);
            console.log(res.data);
            setSodata(res.data);
        } catch (error) {
            console.log("error getting the crm data", error);
        }
    }

    const [messdata, setMessdata] = useState(MessApi);

    const [saletype, setSaletype] = useState('activecustomer');
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

    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    console.log("three month date", threeMonthsAgo.toLocaleDateString('en-US'));

    const handleFilterRec = () => {
        const ans = sodata.filter((x) => {
            const mobnumner = x.customer_mobileNumber.toString();
            return mobnumner.includes(recipientIdFilter)
        });

        console.log('asnns' + ans);

        messdata.forEach(x => {
            handledays(x.joiningdate, x.closingdate);
        })


        setFls(ans);
    }
    const clearThesearch = () => {
        setRecipientIdFilter('');
        setFls('');
    }

    const customerCategory = {
        activecustomer: ActiveCustomer,
        inactivecustomer: InactiveCustomer,
        topcustomer: TopCustomer,
        messcustomer: MessCustomer,
    }

    const SelectedComponent = saletype ? customerCategory[saletype] : null;

    const handleMess = () => {
        // window.location.assign('/profile') 

        // or
        window.location.href = "/#/messdetails"
    }

    const handledays = (startDate, endDate) => {
        const formattedStartDate = new Date(startDate);
        const formattedEndDate = new Date(endDate);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = formattedEndDate - formattedStartDate;

        // Calculate the difference in days
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        console.log(differenceInDays);
    }

    //freq count :]
    const findRepeatedMobileNumbers = (data) => {
        const mobileNumbers = data.map(item => item.customer_mobileNumber);
        const counts = {};

        // Count occurrences of each mobile number
        mobileNumbers.forEach(number => {
            counts[number] = (counts[number] || 0) + 1;
        });

        // Filter numbers with counts greater than 1
        const repeatedNumbers = Object.keys(counts).filter(number => counts[number] > 1);


        return { repeatedNumbers, counts };
    };

    const { repeatedNumbers, counts } = findRepeatedMobileNumbers(sodata);
    console.log("repeatedMobileNumbers", repeatedNumbers, counts);

    return (
        <div>
            <h1 className='text-center'>CRM </h1>
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

                    <label for="name" class="form__label">Find by Number</label>

                </div>

                <div>
                    <button onClick={handleFilterRec} className="btn-fl"><i class="animation"></i>Filter<i class="animation"></i>
                    </button>
                </div>

                <div>
                    <button onClick={clearThesearch} className="btn-fl"><i class="animation"></i>Clear<i class="animation"></i>
                    </button>
                </div>

                <button className='btn-mess' onClick={handleMess}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Add MESS
                    </span>
                </button>

                <div className='foo-cat-1'>
                    <span htmlFor="foodCategory">Sort by :</span>
                    <select id="foodCategory-1" onChange={handleSalestate} value={saletype}>
                        <option value="activecustomer">Active Customer</option>
                        <option value="topcustomer">Top Customer</option>
                        <option value="inactivecustomer">Incative Customer</option>
                        <option value="messcustomer">Mess Customer</option>
                    </select>

                </div>


            </div>
            <div>

                {fls === '' ? SelectedComponent && <SelectedComponent
                    data={sodata}
                    currmonth={threeMonthsAgo.toLocaleDateString('en-US')}
                    messdata={messdata}
                    repeatedNumbers={repeatedNumbers}
                    counts={counts}
                /> : ''}

                {
                    fls && fls.length > 0 && (<div>
                        <h1 className='text-center mt-2'>Search Result</h1>
                        <p className='text-center mt-2'>based on mobile number</p>
                        <div className='orderCont'>

                            <ul class="responsive-table">
                                <li class="otable-header">
                                    <div class="colo colo-3">Customer Name</div>
                                    <div class="colo colo-4">Customer Number</div>
                                    <div class="colo colo-4">Customer email</div>
                                    <div class="colo colo-4">Status</div>
                                </li>
                                {/* only three parameter is passed as it should contin only total,discount,net total */}
                                {
                                    // hashmap table or dictionary
                                    fls && fls.filter((customer, index, self) => {
                                        return (
                                            index ===
                                            self.findIndex(
                                                (c) => c.customer_name === customer.customer_name && c.customer_mobileNumber === customer.customer_mobileNumber
                                            )
                                        );
                                    }).map((val, idx) => {
                                        return (
                                            <>
                                                <CRMCards
                                                    name={val.customer_name}
                                                    status='from backends'
                                                    number={val.customer_mobileNumber}
                                                    email={val.type}
                                                    
                                                />
                                            </>
                                        )
                                    })
                                }


                            </ul>

                        </div>

                    </div>)
                }
            </div>
        </div>
    );
}

export default CRM;
