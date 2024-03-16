import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CScards = ({name,recipientid,creditamt,debitamt,balancetopay, custData, handleReceive}) => {

    const handlepay = ()=>{
        toast.success("Make payment to "+recipientid + name);

    }

    return (
        <div>
            <li class="otable-row-ss"  >

                <div class="colo colo-1-ss" data-label="Job Id">{name}{custData.type}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{recipientid}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{creditamt === 0? '-':creditamt}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{debitamt === 0 ? '-': debitamt}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{balancetopay}</div>
                <div class="colo colo-3-ss" data-label="Payment Status"><button onClick={()=>{handleReceive(custData)}} className='btn btn-primary me-3'>Recived</button>
               
                <ToastContainer />
                </div>

            </li>
        </div>
    );
}

export default CScards;
