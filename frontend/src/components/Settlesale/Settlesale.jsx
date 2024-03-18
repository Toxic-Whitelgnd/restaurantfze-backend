import React, { useEffect, useState } from 'react';
import "./settlesale.css";
import SettleCard from '../../cards/SettleCards/SettleCard';
import axios from 'axios';

const Settlesale = () => {

    const [cashAtStarting, setCashAtStarting] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [cash, setCash] = useState('');
    const [cashSale,setCashSale] = useState('');
    const [creditRecovery,setCreditRecovery] = useState('');

    const SettleSaleApi = [
        {
            id: 1,
            type: 'gdt', //gross total,discount,net total
            name: 'Gross Total',
            total: 1025,

        },
        {
            id: 2,
            type: 'gdt', //gross total,discount,net total
            name: 'Discount',
            total: 1025,


        },
        {
            id: 3,
            type: 'gdt', //others
            name: 'Net Total',
            total: 1025,

        },

        {
            id: 4,
            type: 'ss', //others
            name: 'Cash at Starting',
            total: cash,

        },
        {
            id: 5,
            type: 'ss', //others
            name: 'Cash Sale',
            total: 0,

        },
        {
            id: 6,
            type: 'ss', //others
            name: 'Card Sale',
            total: 0,

        },

        {
            id: 8,
            type: 'ss', //others
            name: 'Credit Recover Sale',
            total: 0,

        },
        {
            id: 9,
            type: 'ss', //others
            name: 'Delivery Sale',
            total: 0,

        },

        {
            id: 11,
            type: 'ss', //others
            name: 'Pay Back',
            total: 0,

        },
        {
            id: 12,
            type: 'ss', //others
            name: 'Expenses',
            total: 0,

        },
        {
            id: 13,
            type: 'ss', //others
            name: 'VAT',
            total: 0,

        },
        {
            id: 14,
            type: 'ss', //others
            name: 'Cash Drawyer',
            total: 0,

        },


    ]

    const [ss, setss] = useState(SettleSaleApi);




    useEffect(() => {
        fetchTodayDate();
        setTimeout(() => {
            fetchCashAtStarting();
            fetchCashSaleAt();
            fetchCreditSales();
           
        }, 1000);

    }, []);

    useEffect(() => {
        fetchSettleSale(selectedDate);
    },[selectedDate]);
    const fetchTodayDate = () => {
        const today = new Date();

        // Format the date as YYYY-MM-DD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Set today's date as the default selected date
        setSelectedDate(formattedDate);
    }
    const fetchCashAtStarting = async () => {
        try {
            const today = new Date();

            // Format the date as YYYY-MM-DD
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            console.log(selectedDate);
            const res = await axios.get(`https://restogenius.onrender.com/get_cashatstarting1/${formattedDate}`);
            console.log(res.data);
            setCash(res.data.cash);

        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchCashAtStartingwithParams = async (sdate) => {
        try {
            console.log(selectedDate);
            const res = await axios.get(`https://restogenius.onrender.com/get_cashatstarting1/${sdate}`);
            console.log(res.data);
            setCash(res.data.cash);

        } catch (error) {
            console.error("No cash at starting");
            setCash(0);
            console.log(error.message);
        }
    };

    const fetchCashSaleAt = async () => {
        try {
            const today = new Date();

            // Format the date as YYYY-MM-DD
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            console.log("from cashsale", formattedDate);
            const res = await axios.get(`https://restogenius.onrender.com/get_cashsale/${formattedDate}`);
            console.log(res.data);
            setCashSale(res.data.totalSales)

        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchCashSaleAtParams = async (cdate) => {
        try {
            console.log(cdate);
            const res = await axios.get(`https://restogenius.onrender.com/get_cashsale/${cdate}`);
            console.log(res.data);
            setCashSale(res.data.totalSales)

        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchCreditSales = async () => {
        try {
            const today = new Date();

            // Format the date as YYYY-MM-DD
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            console.log(selectedDate);
            const res = await axios.get(`https://restogenius.onrender.com/get_creditsalerecovery/${formattedDate}`);
           
            console.log(res.data);
            setCreditRecovery(res.data.creditSales);

        } catch (error) {
            console.log(error.message);
        }
    };

        // for change in the date

        const handleDateChange = (event) => {
            console.log("from date change", event.target.value);
            setSelectedDate(event.target.value);
            fetchCashAtStartingwithParams(event.target.value);
            fetchCashSaleAtParams(event.target.value);
        };

    const [isSetted,setSetteld] = useState(false);

    const  fetchSettleSale = async (selectedDate)=>{
        try {
            const res = await axios.get(`https://restogenius.onrender.com/settlesale/${selectedDate}`);
            console.log(res.data.data);
            if(res.data.data.length > 0){
                console.log("valid");
                setSetteld(true);
            }
        } catch (error) {
            console.log(error);
        }
    }



    const handleSettlePrint = async ()=>{
        const today = new Date();

        const settelsale = {
            date: convertDateFormat(selectedDate),
            total: 0,
            cashAtStarting: cash ? cash : 0,
            creditRecoverySale: creditRecovery,
            cashSale: cashSale,
        }

            console.log(selectedDate);
         if(!isSetted){
            try {
                const res = await axios.put(`https://restogenius.onrender.com/update_settlesale/${selectedDate}`,settelsale);
                console.log(res.data.data);
                if(res.data.success){
                    window.location.href = `/#/printrecipiet/settlesale/${selectedDate}`
                    
                }
            } catch (error) {
                console.log(error);
            }
         }
         else{
            console.log("in post");
            try {
                const res = await axios.post(`https://restogenius.onrender.com/save_settlesale`,settelsale);
                console.log(res.data.success);
                if(res.data.success){
                    window.location.href = `/#/printrecipiet/settlesale/${selectedDate}`
                }
            } catch (error) {
                console.log(error);
            }
         }
                    
                
           

       
        
    }

    function convertDateFormat(dateString) {
        const parts = dateString.split('-');
        const year = parts[0];
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
      
        // Format the date as MM/DD/YYYY
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      }

    const getTotal = ()=>{
        return cash+creditRecovery+cashSale;
    }



    return (
        <div>
            <div className='mt-3'>
                <div>
                    <label htmlFor="datePicker">Select Date:</label>
                    <input
                        type="date"
                        id="datePicker"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <p>Selected Date: {selectedDate}</p>
                </div>
     

            </div>

            <h3 className='d-flex justify-content-center'>Settle Sale</h3>
            <div className='orderCont'>

                <ul class="responsive-table">
                    <li class="otable-header">
                        <div class="colo colo-1">Content</div>
                        <div class="colo colo-4">Amount</div>
                    </li>
                    {/* only three parameter is passed as it should contin only total,discount,net total */}

                    <div>
                        <li class="otable-row-ss"  >

                            <div class="colo colo-1-ss" data-label="Job Id">Cash At Starting</div>
                            <div class="colo colo-4-ss" data-label="Payment Status">{cash ? cash : 0}</div>

                        </li>
                    </div>
                    <div>
                        <li class="otable-row-ss"  >

                            <div class="colo colo-1-ss" data-label="Job Id">Cash Sale</div>
                            <div class="colo colo-4-ss" data-label="Payment Status">{cashSale ? cashSale : 0}</div>

                        </li>
                    </div>
                    <div>
                        <li class="otable-row-ss"  >

                            <div class="colo colo-1-ss" data-label="Job Id">CreditRecovery Sale</div>
                            <div class="colo colo-4-ss" data-label="Payment Status">{creditRecovery ? creditRecovery : 0}</div>

                        </li>
                    </div>
                    <div>{getTotal}</div>


                </ul>
                <div className='d-flex justify-content-evenly mb-3'>
                    <button className='btn btn-primary' onClick={handleSettlePrint}>Print</button>
                    {/* <button className='btn btn-primary'>Sumbit</button> */}
                </div>

            </div>
        </div>
    );
}

export default Settlesale;
