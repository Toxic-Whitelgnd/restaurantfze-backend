import React, { useState } from 'react';
import { motion } from "framer-motion"
import "./foodcard.css"
import TableorderCard from '../Table/TableorderCard';
import DineinOrderpage from '../../components/DineIn/dineinOrderpage';
import TableBody from '../Table/tableBody';

const FoodCard = ({ image, foodname, price, available, quantity, type }) => {

    const [selectedFood, setSelectedFood] = useState([]);

    const handleButtonClick = () => {
        // fetch and save in the database and load it in the table order page
        const fetchedFoodDetails = {
            name: foodname,
            price: price,
            id:'2'
        };

        // Set the selected food details
        setSelectedFood(fetchedFoodDetails);

        console.log(fetchedFoodDetails);


    };

    return (
        <div>
            <div>

                {/* <motion.div className='item-prdt'
                
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 1.0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                        
                    <div className='box-pdt-1' style={{ background: `#0f0sde` ,backgroundImage:`${image}`}}>
                    <img src={image} alt={foodname} className='img-card' ></img>
                        {available == 1 ? <span class="badge position-absolute translate-middle aval" style={{ backgroundColor: 'green' }}>'</span> : <span class="badge position-absolute translate-middle notaval" style={{ backgroundColor: 'red' }}>'</span>}
                        <h5 className='tb-no'>{foodname} {quantity == 0 ? '' : quantity}</h5>
                        <p className='ordered-items'>Price : AED {price}</p>
                    </div>
                    
                </motion.div> */}

                <div className="my-alert">
                    <div className="my-alert__unique1">
                        <img src={image} alt={foodname} className='img-card' ></img>
                    </div>
                    {available == 1 ? <span class="badge position-relative translate-middle aval" style={{ backgroundColor: 'green' }}>'</span> : <span class="badge position-relative translate-middle notaval" style={{ backgroundColor: 'red' }}>'</span>}
                    <div className="my-alert__unique2">
                        <div className='my-alert__unique3'>
                            <div className='my-alert__unique4'>
                                <span className='fs-4 fw-bold text-capitalize'>{foodname}</span>
                                {/* <p className='fs-6'>{quantity == 0 ? '' : quantity}</p> */}
                            </div>
                            <span className='mt-3 fw-semibold'>AED {price}</span>
                        </div>
                        <button
                            className='cust-btn-cart' onClick={handleButtonClick} type='button'
                            
                        >Add to cart</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FoodCard;
