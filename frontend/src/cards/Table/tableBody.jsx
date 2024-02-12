import React from 'react';
import "./tableorder.css";
import TableorderCard from './TableorderCard';

const TableBody = () => {

    // dummby
    const fooditem = {
        'name': 'prawn',
        'price': '5',
        'id': 1,
    }

    return (
        <div>
            <div className='orderCont'>
                        <h5 className='d-flex justify-content-center'>Track your order here</h5>
                        <ul class="responsive-table">
                            <li class="otable-header">
                                <div class="colo colo-1">Id</div>
                                <div class="colo colo-2">Name</div>
                                <div class="colo colo-5">Quantity</div>
                                <div class="colo colo-3">Price</div>
                                <div class="colo colo-4">Amount</div>
                            </li>
                            {/* save to db and fetch from there */}
                            {
                                <TableorderCard fooditem={fooditem} />
                            }
                           

                        </ul>
                        {/* the total goes here */}
                        <div>
                            <h5>Total: AED 56</h5>
                        </div>
                    </div>
        </div>
    );
}

export default TableBody;
