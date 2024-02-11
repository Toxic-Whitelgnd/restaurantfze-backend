import React, { useState } from 'react';
import "./settlesale.css";
import SettleCard from '../../cards/SettleCards/SettleCard';

const Settlesale = () => {
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
            total: 1025,

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
            id: 7,
            type: 'ss', //others
            name: 'Cash at Starting',
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
            id: 10,
            type: 'ss', //others
            name: 'Delivery Recovery',
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

    return (
        <div>
            <div className='mt-3'>
                <div className='orderCont'>

                    <ul class="responsive-table">
                        <li class="otable-header">
                            <div class="colo colo-1">Content</div>
                            <div class="colo colo-4">Amount</div>
                        </li>
                        {/* only three parameter is passed as it should contin only total,discount,net total */}
                        {
                            ss && ss.filter(x => x.type == 'gdt').map((val, idx) => {
                                return (
                                    <div key={idx}>
                                        <SettleCard
                                            name={val.name}
                                            total={val.total}
                                        />
                                    </div>
                                )
                            })
                        }



                    </ul>

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
                        {
                            ss && ss.filter(x => x.type == 'ss').map((val, idx) => {
                                return (
                                    <div key={idx}>
                                        <SettleCard
                                            name={val.name}
                                            total={val.total}
                                        />
                                    </div>
                                )
                            })
                        }



                    </ul>
                    <div className='d-flex justify-content-evenly mb-3'>
                    <button className='btn btn-primary'>Print</button>
                    <button className='btn btn-primary'>Sumbit</button>
                    </div>

                </div>
        </div>
    );
}

export default Settlesale;
