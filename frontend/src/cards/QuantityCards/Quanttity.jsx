import React, { useState } from 'react';

const Quanttity = ({ quantity, increaseQuantity, decreaseQuantity }) => {
    
    return (
        <div>
            <div>
                <button onClick={decreaseQuantity} className='btn btn-danger'>-</button>
                <span className='m-3'>{quantity}</span>
                <button onClick={increaseQuantity} className='btn btn-success'>+</button>
            </div>
        </div>
    );
}

export default Quanttity;
