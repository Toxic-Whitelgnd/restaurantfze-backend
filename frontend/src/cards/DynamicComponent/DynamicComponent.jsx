import React from 'react';

const FoodCard = ({ val, handleFoodItem }) => {
    const cardStyle = {
        backgroundColor: val.foodAvailability ? '#ffffff' : '#f0f0f0',
        cursor: val.foodAvailability ? 'pointer' : 'not-allowed',
        maxWidth: '200px',
        maxHeight: '100px',
        overflow: 'hidden',
        display: 'flex', 
        borderRadius: '10px',// Set the display property to flex
    };

    const imageStyle = {
        width: '100%', // Set the width of the image column
        height: '100%',
        objectFit: 'contain',
        padding: '5px',
        borderRadius: '15px',
    };

    const detailsStyle = {
        width: '100%', // Set the width of the details column
        padding: '8px',
    };

    return (
        <div className="food-card" style={cardStyle} onClick={() => val.foodAvailability && handleFoodItem(val)}>
            <div className="food-image" style={imageStyle}>
                <img src={`data:image/jpeg;base64,${val.foodImage}`} alt={val.foodName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="food-details" style={detailsStyle}>
                <p style={{fontSize:'15px',fontWeight:'bold'}}>{val.foodName.toUpperCase()}</p>
                <p style={{fontSize:'12px',fontWeight:'bold'}}>AED: {val.foodPrice}</p>
            </div>
        </div>
    );
};




const DynamicComponent = ({ fooddata, foodtype, foodterm,handleFoodItem }) => (
    <>
        <div className='d-flex flex-wrap gap-2 mt-2 row-gap-3'>

            {
                foodtype == 'all' ? fooddata.filter(x => x.foodName.toLowerCase().includes(foodterm.toLowerCase())).map((val, idx) => {
                    return (
                        <>
                            <FoodCard key={idx} val={val} handleFoodItem={handleFoodItem} />
                        </>
                    )
                })

                    : fooddata.filter(x => x.foodType === foodtype).filter(x => x.foodName.toLowerCase().includes(foodterm.toLowerCase())).map((val, idx) => {
                        return (
                            <>
                                <FoodCard key={idx} val={val} handleFoodItem={handleFoodItem} />
                            </>
                        )
                    })

            }


           
        </div>
    </>
)

export default DynamicComponent