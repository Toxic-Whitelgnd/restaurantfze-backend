import React, { useEffect, useState } from 'react';
import "./Payback.css"
import SaleOrderApi from '../api/sodapi';
import PaybackCard from '../../cards/PayBackCards/paybackCard';
import axios from 'axios';

const PayBack = () => {

    const [pb,setpb] = useState(SaleOrderApi);

    const [rcard,setRcard] = useState([]);
    useEffect(() =>{
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const res =  await axios.get(`http://localhost:9999/get_payback`);
            console.log(res.data);
            setpb(res.data.data);
  
        } catch (error) {
            console.log(error.message);
        }
    }

    const [rcid,setrcip] = useState('');
    const onChangeRc = (e)=>{
        setrcip(e.target.value);
    }

    const FindRcId = ()=>{
        const RCans = pb.filter((x)=> x.order_no.toString().includes(rcid));
        
        setRcard(RCans);
        console.log(RCans);
    }

    return (
        <div className='text-center'>
            <h1>Payback page</h1>
            <div className='dinein-navbar-cont-pb'>
                <label for="inp" class="inp">
                    <input type="text" id="inp" placeholder="&nbsp;" 
                    onChange={onChangeRc}
                    value={rcid}
                    />
                    <span class="label">Enter Recipient ID</span>
                    <span class="focus-bg"></span>
                </label>
                <button class="btn-31" onClick={FindRcId}>
                    <span class="text-container">
                        <span class="text">Find</span>
                    </span>
                </button>
            </div>
            <div>
                {rcard && rcard != '' ? rcard.map((val,idx)=>{
                    return(
                        <>
                        <div key={idx}>
                            <PaybackCard 
                            name={val.customer_name}
                            // ordertype={val.ordertype}
                            recId={val.receiptNo}
                            paidby={val.paid_by}
                            odate={val.date}
                            otime={val.time}
                            total={val.total}
                            bcolor={val.color}
                            trasactionid={val.order_no}
                            number={val.customer_mobileNumber}
                            />
                        </div>
                        
                        </>
                    )
                }) : 'Recipient ID not found'}

            </div>
        </div>
    );
}

export default PayBack;
