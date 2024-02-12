import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RunningOrder = () => {
    useEffect(() => {
        fetchCurrentOrder();
    }, []);

    const [runningOrder, setRunningOrder] = useState([]);
    const fetchCurrentOrder = async () => {
        try {
            const res = await axios.get('https://restogenius.onrender.com/get_saved_orders');
            console.log(res.data);
            setRunningOrder(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (val) => {
        if (val.orderFrom == "indoor") {
            try {
                const res = await axios.delete(`https://restogenius.onrender.com/delete_current_indoor_order/${val.table_no}`);
                console.log(res.data);
                if(res.data.success){
                    window.location.reload();
                }
            } catch (error) {
                console.log(error.message);
            }
         
        } else {
            try {
                const res = await axios.delete(`https://restogenius.onrender.com/delete_current_outdoor_order/${val.table_no}`);
                console.log(res.data);
                if(res.data.success){
                    window.location.reload();
                }
            } catch (error) {
                console.log(error.message);
            }
            
        }

    }

    const [selectedOption, setSelectedOption] = useState('indoor');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div>
            <h1>Check the running orders here</h1>

            <label htmlFor="options">Select an option:</label>
            <select id="options" value={selectedOption} onChange={handleOptionChange}>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
            </select>
         
            <div className='orderCont-runningorder'>
                <ul class="responsive-table-popup">
                    <li class="otable-header">
                        <div class="colo colo-2">CustomerName</div>
                        <div class="colo colo-2">WaiterName</div>
                        <div class="colo colo-2">OrderNo</div>
                        <div class="colo colo-2">DateTime</div>
                        <div class="colo colo-2">TableNo</div>
                        <div class="colo colo-2">ItemsOrdered</div>
                        <div class="colo colo-3">Total</div>
                        <div class="colo colo-3">View</div>
                    </li>

                    {/* Dynamic TODO: */}
                    {runningOrder && runningOrder.filter(x => x.orderFrom == selectedOption).map((val, idx) => {
                        return (
                            <>
                                <li class="otable-row">
                                    <div class="colo colo-2">{val.customer_details.name}</div>
                                    <div class="colo colo-2">{val.waiterName}</div>
                                    <div class="colo colo-2">{val.order_no}</div>
                                    <div class="colo colo-2">{val.date}{val.time}</div>
                                    <div class="colo colo-2">{val.table_no}</div>
                                    <div class="colo colo-2">{val.items_ordered}</div>
                                    <div class="colo colo-3">{val.total}</div>
                                    <div class="colo colo-3"><a href={selectedOption == 'indoor' ? `/#/itable/${val.table_no}` : `/#/otable/${val.table_no}`}>view</a>
                                        <button className='btn btn-danger' onClick={() => handleDelete(val)}>Delete</button>
                                    </div>

                                </li>

                            </>
                        )
                    })}
                </ul>


            </div>
        </div>
    );
}

export default RunningOrder;
