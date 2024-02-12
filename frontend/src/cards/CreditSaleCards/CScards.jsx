import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CScards = ({name,recipientid,creditamt,debitamt,balancetopay,action}) => {

    const handlepay = ()=>{
        toast.success("Make payment to "+recipientid + name)
    }

    const handleStatement = ()=>{
        toast.info("I dont what this will do")
    }

    return (
        <div>
            <li class="otable-row-ss"  >

                <div class="colo colo-1-ss" data-label="Job Id">{name}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{recipientid}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{creditamt === 0? '-':creditamt}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{debitamt === 0 ? '-': debitamt}</div>
                <div class="colo colo-4-ss" data-label="Payment Status">{balancetopay}</div>
                <div class="colo colo-3-ss" data-label="Payment Status"><button onClick={handlepay} className='btn btn-primary me-3'>Pay</button>
                <button onClick={handleStatement} className='btn btn-success'>Statement</button>
                <ToastContainer />
                </div>

            </li>
        </div>
    );
}

export default CScards;
