import React, { useEffect, useState } from 'react';
import Quanttity from '../QuantityCards/Quanttity';

const TableorderCard = ({ key, fooditem, onIncrement, onDecrement , onAmountChange}) => {
    // /handling the quantity
    // const [quantity, setQuantity] = useState(1);


    return (
        <div>



            <>

                <li class="otable-row"  >
                    {/* <button type="button" className="close-btn-ord-ls" onClick={CloseOrder} >
                                &times;
                            </button> */}
                    <div class="colo colo-1" data-label="Job Id">{fooditem.id}</div>
                    <div class="colo colo-2" data-label="Customer Name">{fooditem.foodname}{fooditem.qty}</div>
                    <div class="colo colo-5" data-label="Amount"><div>
                        <button onClick={() => onDecrement(fooditem.id)} className='btn btn-danger'>-</button>
                        <span className='m-3'>{fooditem.qty}</span>
                        <button key={fooditem} onClick={() => onIncrement(fooditem.id)} className='btn btn-success'>+</button>
                    </div></div>
                    <div class="colo colo-3" data-label="Amount">{fooditem.price}</div>
                    <div class="colo colo-4" data-label="Payment Status">{fooditem.qty * fooditem.price}</div>

                </li>
            </>



        </div>
    );
}

export default TableorderCard;
