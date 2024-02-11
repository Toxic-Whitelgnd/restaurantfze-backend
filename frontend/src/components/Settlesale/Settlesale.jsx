import React, { useState } from 'react';
import "./settlesale.css";
import SettleCard from '../../cards/SettleCards/SettleCard';
import SettleSaleApi from '../../api/settlesale';

const Settlesale = () => {

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
