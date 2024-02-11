import React, { useState } from 'react';
import "./Payback.css"
import SaleOrderApi from '../../api/sodapi';
import PaybackCard from '../../cards/PayBackCards/paybackCard';

const PayBack = () => {

    const [pb,setpb] = useState(SaleOrderApi);

    const [rcard,setRcard] = useState([]);

    const [rcid,setrcip] = useState('');
    const onChangeRc = (e)=>{
        setrcip(e.target.value);
    }

    const FindRcId = ()=>{
        const RCans = pb.filter((x)=> x.recieptid.includes(rcid));
        
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
                            name={val.custname}
                            // ordertype={val.ordertype}
                            recId={val.recieptid}
                            paidby={val.paidby}
                            odate={val.date}
                            otime={val.time}
                            total={val.total}
                            bcolor={val.color}
                            trasactionid={val.trasactionid}
                            number={val.number}
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
