import React, { useEffect, useRef, useState } from 'react';
import "./sod.css";
import SaleOrderApi from '../api/sodapi';
import SaleOrderCard from '../../cards/SODCards/SaleOrderCard';
import axios from 'axios';

const Sod = () => {

    const [sodata, setSodata] = useState(SaleOrderApi);
    useEffect(()=>{
        fetchCustomerDeatils();
    },[])

    const  fetchCustomerDeatils =async ()=>{
        try {
            const cd = await axios.get('http://localhost:9999/get_customer_details');
            console.log(cd.data);
            setSodata(cd.data); 
        } catch (error) {
            console.log(error);
        }
    }

    const [saletype, setSaletype] = useState('all');
    const handleSalestate = (e) => {
        setSaletype(e.target.value)
    }

    // filter option
    const filterCounterSale = () => {
        return sodata.filter(x => x.type === 'countersale');
    }

    const filterDeliverySale = () => {
        return sodata.filter(x => x.type === 'deliverysale');
    }

    const filterDineinSale = () => {
        return sodata.filter(x => x.type == 'dinein');
    }

    const filterDineoutSale = () => {
        return sodata.filter(x => x.type === 'dineout');
    }

    // for filter selection
    const filtersaleOption = () => {
        if (saletype === 'countersale') {
            return filterCounterSale();
        }
        else if (saletype === 'deliverysale') {
            return filterDeliverySale();
        }
        else if (saletype === 'dinein') {
            return filterDineinSale();
        }
        else if (saletype === 'dineout') {
            return filterDineoutSale();
        }
        else {
            return sodata;
        }
    }

    // call the function and set the filter
    const bySaletype = filtersaleOption();
    // sodata = bySaletype;

    const [fls, setFls] = useState('');

    // recipent id search
    const [recipientIdFilter, setRecipientIdFilter] = useState('');



    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        const filteredCards = sodata.filter((card) => {
            const cardDate = new Date(card.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            return (!start || cardDate >= start) && (!end || cardDate <= end);

        });

        console.log(filteredCards);
        setIsFocused(true);

        setFls(filteredCards);
    };

    const handleFilterRec = () => {

        const ans = sodata.filter((x) =>
            x.order_no.toString().includes(recipientIdFilter));
        console.log(ans);
        setFls(ans);

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
        console.log('Search Term:', e.target.value);
        const ans = sodata.filter((x) =>
            x.order_no.toString().includes(e.target.value));
        console.log(ans);
        setFls(ans);

      };

    return (
        <div>
            <h1>Sale order details</h1>
            <p>Display the navbar with filter and sort </p>
            <div className='food-order-cont-1'>
                <div className='food-category-bar-1'>
                    <div className='foo-cat-1'>
                        <span htmlFor="foodCategory">Order by   :</span>
                        <select id="foodCategory-1" onChange={handleSalestate} value={saletype}>
                            <option value="all">All</option>
                            <option value="dinein">Dinein</option>
                            {/* <option value="dineout">Dinein</option> */}
                            <option value="countersale">countersale</option>
                            <option value="deliverysale">deliverysale</option>
                        </select>
                    </div>
                    <div className='foo-cat'>

                        <input type="text" placeholder="Name" className="form__input" id="name"
                            value={recipientIdFilter}
                            // onChange={(e) => setRecipientIdFilter(e.target.value)}
                            onChange={handleSearch}
                            ref={inputRef}

                            onFocus={handleFocus}
                            onBlur={handleBlur}

                        />

                        <label for="name" class="form__label">Find by RecipientID</label>

                    </div>
                    <button onClick={handleFilterRec} className='btn btn-success'>Find by ID</button>

                    <div className='foo-cat'>
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='foo-cat'>
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>




                    <button onClick={handleFilter} className='btn btn-success'>Filter by date</button>



                </div>

            </div>
            <div className='sod-details'>
                {/* <p>{isFocused ? 'input focused' : 'input not focused so try thr dropdown'}</p> */}
                {
                    isFocused ? fls &&

                    fls.map((val, idx) => {
                        return (
                            <>
                                <div key={idx}>
                                    <SaleOrderCard
                                        name={val.customer_name}
                                        ordertype={val.type}
                                        recId={val.order_no}
                                        discount={val.discount}
                                        odate={val.date}
                                        otime={val.time}
                                        total={val.total}
                                        bcolor={val.color}
                                        val={val}
                                    />
                                </div>
                            </>
                        )
                    })
                        :  bySaletype &&

                        bySaletype.map((val, idx) => {
                            return (
                                <>
                                    <div key={idx}>
                                    <SaleOrderCard
                                        name={val.customer_name}
                                        ordertype={val.type}
                                        recId={val.order_no}
                                        discount={val.discount}
                                        odate={val.date}
                                        otime={val.time}
                                        total={val.total}
                                        bcolor={val.color}
                                        val={val}
                                    />
                                    </div>
                                </>
                            )
                        })

                }
            </div>
        </div>
    );
}

export default Sod;
