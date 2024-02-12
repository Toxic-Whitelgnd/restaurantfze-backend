import React, { useRef, useState } from 'react';
import "./creditsale.css";
import SaleOrderApi from '../api/sodapi';
import CScards from '../../cards/CreditSaleCards/CScards';

const Creditsale = () => {

    const [sodata, setSodata] = useState(SaleOrderApi);

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
        sortTableData(cards, saletype);
        const ans = sodata.filter((x) =>
            x.recieptid.includes(recipientIdFilter));

        setFls(ans);
    }

    // Function to sort table data
    const sortTableData = (type, IorD) => {
        const sortedData = [...sodata];

        if (type === 'credit') {
            // Sort by creditAmt where debitAmt is 0
            if (IorD === "hightolow") {
                sortedData.sort((a, b) => b.creditamt - a.creditamt);
            }
            else if (IorD === "lowtohigh") {
                sortedData.sort((a, b) => a.creditamt - b.creditamt)
            }
            else {
                sortedData.sort((a, b) => b.creditamt - a.creditamt);
            }

        } else if (type === 'debit') {
            // Sort by debitAmt where creditAmt is 0
            // Sort by creditAmt where debitAmt is 0
            if (IorD === "hightolow") {
                sortedData.sort((a, b) => b.debitamt - a.debitamt);
            }
            else if (IorD === "lowtohigh") {
                sortedData.sort((a, b) => a.debitamt - b.debitamt);
            }
            else {
                sortedData.sort((a, b) => b.debitamt - a.debitamt);
            }

        } else if (type === 'balancetopay') {
            // Sort by debitAmt where creditAmt is 0
            // Sort by creditAmt where debitAmt is 0
            if (IorD === "hightolow") {
                sortedData.sort((a, b) => b.balancetopay - a.balancetopay);
            }
            else if (IorD === "lowtohigh") {
                sortedData.sort((a, b) => a.balancetopay - b.balancetopay);
            }
            else {
                sortedData.sort((a, b) => b.balancetopay - a.balancetopay);
            }

        }


        setSodata(sortedData);
    };




    return (
        <div>
            <h1 className='text-center'>Credit sale details</h1>
        
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

                    <label for="name" class="form__label">Find by RecipientID</label>

                </div>

                <div className='foo-cat-1'>
                    <span htmlFor="foodCategory">Sort by :</span>
                    <select id="foodCategory-1" onChange={handleSalestate} value={saletype}>
                        <option value="all">All</option>
                        <option value="hightolow">HighToLow</option>
                        <option value="lowtohigh">LowToHigh</option>
                    </select>

                </div>
                <div className='foo-cat-1'>
                    <span htmlFor="foodCategory">Sort by Card:</span>
                    <select id="foodCategory-1" onChange={handleCard} value={cards}>
                        <option value="all">All</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                        <option value="balancetopay">BalanceToPay</option>
                    </select>
                </div>

                <div>
                    <button onClick={handleFilterRec} className="btn-fl"><i class="animation"></i>Filter<i class="animation"></i>
                    </button>
                </div>


            </div>

            <div className='orderCont'>

                <ul class="responsive-table">
                    <li class="otable-header">
                        <div class="colo colo-3">Customer Name</div>
                        <div class="colo colo-1">RecipentId</div>
                        <div class="colo colo-4">Credit Amt</div>
                        <div class="colo colo-4">Debit Amt</div>
                        <div class="colo colo-3">BalanceTopay</div>
                        <div class="colo colo-3">Action</div>
                    </li>
                    {/* only three parameter is passed as it should contin only total,discount,net total */}
                    {
                        sodata && fls &&fls.map((val, idx) => {
                            return (
                                <>
                                    <CScards
                                        key={idx}
                                        name={val.custname}
                                        recipientid={val.recieptid}
                                        creditamt={val.creditamt}
                                        debitamt={val.debitamt}
                                        balancetopay={val.balancetopay}


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
