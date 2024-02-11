import React, { useEffect, useRef, useState } from 'react';
import TakeAwayLogApi from '../../api/takeawaylogapi';
import TakeAwayCards from '../../cards/TakeAwayCards/TakeAwayCards';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const TakeAwayLog = () => {

    useEffect(()=>{
        fetchTakeaway();
    },[]);

    const [takeaway,setTakeAwayLog] = useState([]);
    const fetchTakeaway = async() =>{
        try {
            const res = await axios.get('http://localhost:9999/get_takeaway_order');
            console.log(res.data);
            setTakeAwayLog(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [Takeaway, setTakeAway] = useState(TakeAwayLogApi);

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
       
        try {
            const ans = takeaway.filter((x) =>
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
            <h1 className='text-center mt-2'>Takeaway Log</h1>
            <div className='food-category-bar-1'>

                <div className='foo-cat'>

                {/* <label for="name" class="form__label">Find by RecipientID</label> */}
                    <input type="text" placeholder="Find by order_no"  id="name"
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
                        <div class="colo colo-1-tk">Customer Name</div>
                        <div class="colo colo-1-tk">Date</div>
                        <div class="colo colo-1-tk">Total</div>
                        <div class="colo colo-4-tk">Action</div>
                    
                    </li>
                    {/* only three parameter is passed as it should contin only total,discount,net total */}
                   {
                     fls === ''? takeaway && takeaway.map((val,idx)=>{
                        return(
                            <>
                            <TakeAwayCards 
                            name={val.customer_name}
                            recipientid={val.order_no}
                            date={val.date}
                            time={val.time}
                            total={val.total}
                            number={val.customer_mobileNumber}
                            items={val.items}
                            discount={val.discount}
                            email={val.customer_email}
                            address={val.customer_address}
                            paymentType={val.paid_by}
                            allVal = {val}
                            />
                            </>
                        )
                    }) : ''}

{
                     fls !== ''? fls && fls.map((val,idx)=>{
                        return(
                            <>
                            <TakeAwayCards 
                            name={val.customer_name}
                            recipientid={val.order_no}
                            date={val.date}
                            time={val.time}
                            total={val.total}
                            number={val.customer_mobileNumber}
                            items={val.items}
                            discount={val.discount}
                            email={val.customer_email}
                            address={val.customer_address}
                            paymentType={val.paid_by}
                            allVal = {val}
                            />
                            </>
                        )
                    }) : ''}

                    


                </ul>

            </div>
        </div>
    );
}

export default TakeAwayLog;
