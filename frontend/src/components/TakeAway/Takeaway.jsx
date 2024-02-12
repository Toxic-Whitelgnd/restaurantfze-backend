// import React, { useEffect, useRef, useState } from 'react';
// import "./takeaway.css"
// import { useParams } from 'react-router-dom';
// import Quanttity from '../../cards/QuantityCards/Quanttity';
// import FoodCard from '../../cards/FoodCards/FoodCard';
// import FoodApi from '../api/foodapi';
// import TableorderCard from '../../cards/Table/TableorderCard';
// import TableBody from '../../cards/Table/tableBody';
// import Paybillpopup from '../../cards/PopupCards/Paybillpopup';
// import GetDate from '../../cards/TimeandDate/GetDate';
// import GetTime from '../../cards/TimeandDate/GetTime';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';





// const TakeAway = () => {

//     // component declaration
//     const SeafoodComponent = ({ fooddata }) => (
//         <>
//             <div className='d-flex flex-wrap gap-2 mt-2'>
//                 {
//                     fooddata.filter(x => x.type == 'seafood').map((val, idx) => {
//                         return (
//                             <>
//                                 <div>
//                                     <FoodCard
//                                         foodname={val.foodname}
//                                         price={val.price}
//                                         quantity={val.qty}
//                                         image={val.img}
//                                         type={val.type}
//                                         available={val.available}
//                                     />
//                                 </div>
//                             </>
//                         )
//                     })

//                 }
//             </div>
//         </>
//     )
//     const BreakfastComponent = ({ fooddata }) => (
//         <>
//             <div className='d-flex flex-wrap gap-2 mt-2 row-gap-3'>

//                 {
                    
//                     fooddata.filter(x => x.type == 'breakfast').map((val, idx) => {
//                         return (
//                             <>
//                                 {/* <div key={idx}>
//                                     <FoodCard
//                                         foodname={val.foodname}
//                                         price={val.price}
//                                         quantity={val.qty}
//                                         image={val.img}
//                                         type={val.type}
//                                         available={val.available}
//                                     />
//                                 </div> */}
//                                 <div className="my-alert">
//                                     <div className="my-alert__unique1">
//                                         <img src={val.img} alt={val.foodname} className='img-card' ></img>
//                                     </div>
//                                     {val.available == 1 ? <span class="badge position-relative translate-middle aval" style={{ backgroundColor: 'green' }}>'</span> : <span class="badge position-relative translate-middle notaval" style={{ backgroundColor: 'red' }}>'</span>}
//                                     <div className="my-alert__unique2">
//                                         <div className='my-alert__unique3'>
//                                             <div className='my-alert__unique4'>
//                                                 <span className='fs-4 fw-bold text-capitalize'>{val.foodname}</span>
//                                                 <p className='fs-6'>{val.qty == 0 ? '' : val.qty}</p>
//                                             </div>
//                                             <span className='mt-3 fw-semibold'>AED {val.price}</span>
//                                         </div>
//                                         {val.available == 0 ? <button
//                                             className='btn cust-btn-cart' onClick={() => handleFoodItem(val)}
//                                             type='button' disabled
//                                         >Add to cart</button> :
//                                             <button
//                                                 className='btn cust-btn-cart' onClick={() => handleFoodItem(val)}
//                                                 type='button'
//                                             >Add to cart</button>}

//                                     </div>
//                                 </div>
//                             </>
//                         )
//                     })

//                 }
//             </div>
//         </>
//     )
//     const LunchComponent = ({ fooddata }) => (
//         <>
//             <div className='d-flex flex-wrap gap-2 mt-2'>

//                 {
//                     fooddata.filter(x => x.type == 'lunch').map((val, idx) => {
//                         return (
//                             <>
//                                 <div>
//                                     <FoodCard
//                                         foodname={val.foodname}
//                                         price={val.price}
//                                         quantity={val.qty}
//                                         image={val.img}
//                                         type={val.type}
//                                         available={val.available}
//                                     />
//                                 </div>
//                             </>
//                         )
//                     })

//                 }
//             </div>
//         </>
//     )
//     const DinnerComponent = ({ fooddata }) => (
//         <>
//             <div className='d-flex flex-wrap gap-2 mt-2'>

//                 {
//                     fooddata.filter(x => x.type == 'dinner').map((val, idx) => {
//                         return (
//                             <>
//                                 <div>
//                                     <FoodCard
//                                         foodname={val.foodname}
//                                         price={val.price}
//                                         quantity={val.qty}
//                                         image={val.img}
//                                         type={val.type}
//                                         available={val.available}
//                                     />
//                                 </div>
//                             </>
//                         )
//                     })

//                 }
//             </div>
//         </>
//     )
//     const SoupComponent = ({ fooddata }) => (
//         <>
//             <div className='d-flex flex-wrap gap-2 mt-2'>

//                 {
//                     fooddata.filter(x => x.type == 'soup').map((val, idx) => {
//                         return (
//                             <>
//                                 <div>
//                                     <FoodCard
//                                         foodname={val.foodname}
//                                         price={val.price}
//                                         quantity={val.qty}
//                                         image={val.img}
//                                         type={val.type}
//                                         available={val.available}
//                                     />
//                                 </div>
//                             </>
//                         )
//                     })

//                 }
//             </div>
//         </>
//     )

//     const categoryComponents = {
//         seafood: SeafoodComponent,
//         breakfast: BreakfastComponent,
//         lunch: LunchComponent,
//         dinner: DinnerComponent,
//         soup: SoupComponent,
//     };


//     // componet ending

//     const { id } = useParams();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [usercreated, setUsercreated] = useState(true);

//     const [fooddata, setFoodData] = useState(FoodApi);


//     const [customerDetails, setCustomerDetails] = useState({
//         name: '',
//         mobileNumber: '',
//         email: '',
//         address:'',
//     });

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         console.log(isModalOpen);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCustomerDetails((prevDetails) => ({
//             ...prevDetails,
//             [name]: value,
//         }));
//     };


//     const handleSave = () => {
//         // Do something with customerDetails object, e.g., store it, send it to an API, etc.
//         console.log('Customer Details:', customerDetails);

//         // need to set thge layout for 
//         setCustomerstate();

//         // Close the modal
//         closeModal();
//     };

//     function setCustomerstate() {
//         setUsercreated(false);
//     }

//     // for food categori selection

//     // Define your food components

//     const [selectedCategory, setSelectedCategory] = useState(null);

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     const SelectedComponent = selectedCategory ? categoryComponents[selectedCategory] : null;

//     // for popup 01 
//     const [modalOpen, setModalOpen] = useState(false);

//     const openModelPaybill = () => {
//         setModalOpen(true)
//     }

//     const closeModalPayBill = () => {
//         console.log(modalOpen);
//         console.log("inside the function");
//         setModalOpen(!modalOpen);
//         console.log(!modalOpen);
//     };

//     const orderDetails = [{
//         foodName: 'Example Food',
//         qty: 2,
//         price: 10,
//     },
//     {
//         foodName: 'Example food1',
//         qty: 1,
//         price: 20,
//     }

//     ];

//     var overtot = 0;
//     const calculateTotalAmount = (qty, price) => {
//         // Calculate total amount based on quantity and price
//         // You can customize this logic based on your requirement
//         return qty * price;
//     };

//     function calTot() {
//         for (var i = 0; i < orderDetails.length; i++) {
//             console.log("qty", orderDetails[i].qty);
//             console.log("price", orderDetails[i].price);
//             var amt = orderDetails[i].qty * orderDetails[i].price;
//             console.log(amt);
//             overtot += amt;
//         }
//     }

//     const calculateVAT = () => {
//         var totalAmount = 0;
//         for (var i = 0; i < orderDetails.length; i++) {
//             var amt = orderDetails[i].qty * orderDetails[i].price;
//             totalAmount += amt;
//         }
//         calTot();

//         return 0.1 * totalAmount; // Assuming 10% VAT
//     };
//     const handlePayBill = () => {
//         // Add logic here to handle the payment
//         console.log('Payment processed successfully');
//         // You can close the modal or perform other actions after payment
//         toast.success("Payment processed successfully")
//         closeModalPayBill();
//     };

//     // handling the food tabler order
//     const fooditem = [{
//         'foodname': 'prawn',
//         'price': '5',
//         'id': 1,
//     },
//     {
//         'foodname': 'dfg',
//         'price': '2',
//         'id': 1,
//     },
//     {
//         'foodname': 'pasdas',
//         'price': '3',
//         'id': 1,
//     },

//     ]

//     const [foodD, setFooditem] = useState([]);

//     const handleFoodItem = (fd) => {
//         const fetchedFd = {
//             foodname: fd.foodname,
//             qty: fd.qty,
//             price: fd.price,
//             id: fd.id,
//         }

//         const newmyFoodArray = [fetchedFd]

//         setFooditem((prevOrders) => [...prevOrders, fetchedFd]);
//         console.log(newmyFoodArray);
//         console.log(newmyFoodArray.length);
//         console.log("succeessfully here");

//     };

//     // to handel the save order
//     const SaveOrder = () => {
//         toast.success("Order saved to database", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//         });
//     }

//     // for filtering the product
//     const [filterOption, setFilterOption] = useState('all');

//     const handleFilterChange = (event) => {
//         setFilterOption(event.target.value);
//       };

//       const filterHighPrice = () => {
//         return fooddata.slice().sort((a, b) => b.price - a.price);
//       };
    
//       const filterLowPrice = () => {
//         return fooddata.slice().sort((a, b) => a.price - b.price);
//       };
    
//       const filterAvailable = () => {
//         return fooddata.filter((item) => item.available);
//       };
    
//       const filterFoodItems = () => {
//         if (filterOption === 'highPrice') {
//           return filterHighPrice();
//         } else if (filterOption === 'lowPrice') {
//           return filterLowPrice();
//         } else if (filterOption === 'available') {
//           return filterAvailable();
//         } else {
//           return fooddata; // Default case, no filtering
//         }
//       };

//       const filteredFoodItems = filterFoodItems();



//     return (
//         <div className='over-order-page'>
//             {usercreated ? <button type="button" className='btn btn-primary mt-2 ms-3' onClick={openModal}>
//                 Add User
//             </button> : <div>
//                 <p className='ms-3 mt-3'>Customer name: <span className='text-capitalize fw-bold'>{customerDetails.name}</span> </p>
//                 <p className='ms-3'>Customer Phone: <span className='text-capitalize fw-bold'>{customerDetails.mobileNumber}</span></p>
//                 <p className='ms-3'>Customer email: <span className='text-capitalize fw-bold'>{customerDetails.email}</span></p>
//                 <p className='ms-3'>Customer address: <span className='text-capitalize fw-bold'>{customerDetails.address}</span></p>
//             </div>}
//             <div className="pop-cont">
//                 {/* Your other content goes here */}

//                 {isModalOpen && (
//                     <div className="modal-overlay1">
//                         <div className="modal1">
//                             <button type="button" className="close-btn" onClick={closeModal}>
//                                 &times;
//                             </button>
//                             <h2>Customer Details</h2>
//                             <form>
//                                 <label>
//                                     Customer Name:
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={customerDetails.name}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </label>
//                                 <label>
//                                     Mobile Number:
//                                     <input
//                                         type="tel"
//                                         name="mobileNumber"
//                                         value={customerDetails.mobileNumber}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </label>
//                                 <label>
//                                     Customer Email:
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={customerDetails.email}
//                                         onChange={handleInputChange}
//                                         required
//                                         max={4}
//                                     />
//                                 </label>
//                                 <label>
//                                     Address:
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         value={customerDetails.address}
//                                         onChange={handleInputChange}
//                                         required
//                                         max={4}
//                                     />
//                                 </label>
//                                 <button type="button" onClick={handleSave} className="save-btn">
//                                     Save
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div className='row g-3'>
//                 <div className='dinein-navbar-cont'>

//                     <div className='info-cont'>
//                         <a href="#" className="running-order" style={{ 'color': '#000' }}>OrderNo #4563</a>
//                         {/* <a href="#" className="running-order" style={{ backgroundColor: "#FF7F7F", borderColor: "#FF7F7F", color: '#000' }}>Floor No 1</a>
//                         <p className="running-order" style={{ backgroundColor: "#009946", borderColor: "#009946", color: '#000' }}>Table {id}</p>
//                         <p className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }}>Seats {customerDetails.numberOfSeats}</p>
//                         <p className="running-order" style={{ backgroundColor: "#FF9D08", borderColor: "#FF9D08", color: '#000' }}>Waiter name </p> */}
//                     </div>
//                     <div className='pay-cont'>

//                         <button className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }} onClick={SaveOrder}>Save Order<ToastContainer /></button>
//                         <p className="running-order" style={{ backgroundColor: "#FF9D08", borderColor: "#FF9D08", color: '#000' }}>Print Reciept </p>
//                         <button onClick={openModelPaybill} className="running-order" style={{ backgroundColor: "#009946", borderColor: "#009946", color: '#000' }}>Pay Bill

//                         </button>
//                     </div>

//                     {/* start of popup */}
//                     {modalOpen && (
//                         <div className="modal-overlay-1">
//                             <div className="modal-1" >
//                                 <div className="modal-header-1">
//                                     <h2>Food Order Details</h2>
//                                     <button type="button" className="close-btn" onClick={closeModalPayBill}>
//                                         &times;
//                                     </button>
//                                 </div>
//                                 <ul class="responsive-table-popup">
//                                     <li class="otable-header">
//                                         <div class="colo colo-1">Id</div>
//                                         <div class="colo colo-2">Name</div>
//                                         <div class="colo colo-5">Quantity</div>
//                                         <div class="colo colo-3">Price</div>
//                                         <div class="colo colo-4">Amount</div>
//                                     </li>


//                                     {orderDetails && orderDetails.map((val, idx) => {
//                                         return (
//                                             <>
//                                                 <li class="otable-row">
//                                                     <div class="colo colo-1" data-label="Job Id">1</div>
//                                                     <div class="colo colo-2" data-label="Customer Name">{val.foodName}</div>
//                                                     <div class="colo colo-5" data-label="Amount">{val.qty}</div>
//                                                     <div class="colo colo-3" data-label="Amount">{val.price}</div>
//                                                     <div class="colo colo-4" data-label="Payment Status">{calculateTotalAmount(val.qty, val.price)}</div>
//                                                 </li>

//                                             </>
//                                         )
//                                     })}
//                                 </ul>

//                                 <div className="order-details-row">
//                                     <p>VAT:</p>
//                                     {calculateVAT()} %

//                                 </div>
//                                 <div className="order-details-row">
//                                     <p>Total:</p>
//                                     <p>AED {overtot}</p>

//                                 </div>
//                                 <button className="btn btn-success" onClick={handlePayBill} >Pay Bill</button>
//                             </div>

//                         </div>
//                     )}

//                     {/* end of popup */}
//                 </div>
//                 {/* layout -1 */}
//                 <div className='col-sm-6'>
//                     <div className='orderCont'>
//                         <h5 className='d-flex justify-content-center'>Track your order here</h5>
//                         <ul class="responsive-table">
//                             <li class="otable-header">
//                                 <div class="colo colo-1">Id</div>
//                                 <div class="colo colo-2">Name</div>
//                                 <div class="colo colo-5">Quantity</div>
//                                 <div class="colo colo-3">Price</div>
//                                 <div class="colo colo-4">Amount</div>
//                             </li>
//                             {/* save to db and fetch from there */}
//                             {foodD &&
//                                 < TableorderCard fooditem={foodD} />
//                             }


//                         </ul>
//                         {/* the total goes here */}
//                         <div>
//                             <h5>Total: AED 56</h5>
//                         </div>
//                     </div>
//                 </div>
//                 {/* layout - 2 */}
//                 <div className='col-sm-5'>
//                     <div className='food-order-cont'>
//                         <div className='food-category-bar'>
//                             <div className='foo-cat'>
//                                 <span htmlFor="foodCategory">Food Category</span>
//                                 <select id="foodCategory" onChange={handleCategoryChange} value={selectedCategory || ''}>
//                                     <option value="">Select...</option>
//                                     <option value="seafood">Seafood</option>
//                                     <option value="breakfast">Breakfast</option>
//                                     <option value="lunch">Lunch</option>
//                                     <option value="dinner">Dinner</option>
//                                     <option value="soup">Soup</option>
//                                 </select>
//                             </div>
//                             <div className='foo-cat'>
//                             <span htmlFor="foodCategory">Sort-by or Filter</span>
//                             <select id="foodCategory" onChange={handleFilterChange} value={filterOption}>
//                                 <option value="all">All</option>
//                                 <option value="highPrice">High Price</option>
//                                 <option value="lowPrice">Low Price</option>
//                                 <option value="available">Available</option>
//                             </select>
//                             </div>

//                             <div className='date-time'>

//                                 <GetDate />
//                                 <br></br>
//                                 <GetTime />
//                             </div>

//                         </div>
//                         <div>
//                             {SelectedComponent && <SelectedComponent
//                                 fooddata={filteredFoodItems} />}

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>



//     );
// }

// export default TakeAway;

import React, { useEffect, useRef, useState } from 'react';
import "./takeaway.css"
import { useParams } from 'react-router-dom';
import Quanttity from '../../cards/QuantityCards/Quanttity';
import FoodCard from '../../cards/FoodCards/FoodCard';
import FoodApi from '../api/foodapi';
import TableorderCard from '../../cards/Table/TableorderCard';
import TableBody from '../../cards/Table/tableBody';
import Paybillpopup from '../../cards/PopupCards/Paybillpopup';
import GetDate from '../../cards/TimeandDate/GetDate';
import GetTime from '../../cards/TimeandDate/GetTime';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';





const TakeAway = () => {

    const { id } = useParams();

    // Componet's are Dynamic 

    const DynamicComponent = ({ fooddata, foodtype }) => (
        <>
            <div className='d-flex flex-wrap gap-2 mt-2 row-gap-3'>

                {

                    fooddata.filter(x => x.foodType === foodtype).map((val, idx) => {
                        return (
                            <>
                                <div className="my-alert">
                                    <div className="my-alert__unique1">
                                        {val.foodImage && (
                                            <img src={`data:image/jpeg;base64,${val.foodImage}`} alt={val.foodName} className='img-card' />
                                        )}

                                    </div>
                                    {val.foodAvailability === 'Yes' ? <span class="badge position-relative translate-middle aval" style={{ backgroundColor: 'green' }}>'</span> : <span class="badge position-relative translate-middle notaval" style={{ backgroundColor: 'red' }}>'</span>}
                                    <div className="my-alert__unique2">
                                        <div className='my-alert__unique3'>
                                            <div className='my-alert__unique4'>
                                                <span className='fs-4 fw-bold text-capitalize'>{val.foodName}</span>
                                                <p className='fs-6'>{val.foodQty == 0 ? '' : val.foodQty}</p>
                                            </div>
                                            <span className='mt-3 fw-semibold'>AED {val.foodPrice}</span>

                                        </div>
                                        {val.foodAvailability === 'No' ? <button
                                            className='btn cust-btn-cart' onClick={() => handleFoodItem(val)}
                                            type='button' disabled
                                        >Add to cart</button> :
                                            <button
                                                className='btn cust-btn-cart' onClick={() => handleFoodItem(val)}
                                                type='button'
                                            >Add to cart</button>}

                                    </div>
                                </div>
                            </>
                        )
                    })

                }
            </div>
        </>
    )

    // componet ending

    // from server side rendering


    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();

        fetchCurrentOrder();

        fetchWaiter();

        fetchTableData();

        fetchBillD();
    }, []);

    const [tableData, setTableData] = useState([]);
    const fetchTableData = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/table_data');
            setTableData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [waiter, setWaiter] = useState([]);
    const fetchWaiter = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/get_waiter');
            console.log(response.data);
            setWaiter(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [bill, setBill] = useState([]);
    const fetchBillD = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/get_billd');
            console.log(response.data);
            setBill(response.data[0]);

        } catch (error) {
            console.log(error.message);
        }
    };

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/get_food_data');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usercreated, setUsercreated] = useState(true);

    const [fetchFood, setFetchFood] = useState('');
    const [ordersave, setOrdersave] = useState(true);


    const fetchCurrentOrder = async () => {
        try {
            const response = await axios.get(`https://restogenius.onrender.com/get_saved_orders/${id}`);
            console.log(response.data);

            // DYnmic changeHere :TODO:
            const outdoorSavedOrder = response.data.filter(x => x.orderFrom == "takeaway");
            console.log("Here");
            if (outdoorSavedOrder == '') {
                console.log("Empty saved orders");
                setOrdersave(true);
                // console.log(ordersave);
                setUsercreated(true);
            }
            else {
                // DYnamic change here: TODO:
                console.log("Saved orders", outdoorSavedOrder);
                    setFetchFood(outdoorSavedOrder[0]);
                    setOrdersave(false); // this is indicate that the oreder existed or not (fasle)
                    // console.log(ordersave);
                    setUsercreated(false);
                

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // end of serverside rendering

    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        mobileNumber: '',
        email: '',
        address: '',
    }
    );


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        console.log(isModalOpen);
    };

    // customer details handling
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSave = () => {

      
        
            console.log('Customer Details:', customerDetails);

            // need to set thge layout for 
            setCustomerstate();

            // Close the modal
            closeModal();
        
    };

    function setCustomerstate() {
        setUsercreated(false);
    }

    // for updation of the modal
    const [isupdateModalOpen, setIsupdateModalOpen] = useState(false);
    const openUpdateModal = () => {
        setIsupdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsupdateModalOpen(false);
        console.log(isModalOpen);
    };

    // for food categori selection

    // Define your food components

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };



    // for popup 01 
    const [modalOpen, setModalOpen] = useState(false);

    const openModelPaybill = () => {
        setModalOpen(true)
    }

    const closeModalPayBill = () => {
        console.log(modalOpen);
        console.log("inside the function");
        setModalOpen(!modalOpen);
        console.log(!modalOpen);
    };

    // handling the food state
    const [foodD, setFooditem] = useState([]);

    const handleFoodItem = (fd) => {

        const fetchedFd = {
            foodname: fd.foodName,
            qty: 1,
            price: fd.foodPrice,
            id: fd._id.substring(fd._id.length - 3, fd._id.length),
            amt: Number(fd.foodPrice) + Number(fd.foodPrice),
            status: "not ready",
            orderFrom: "takeaway", //Dynamic TODO:
        }

        console.log("mff" + fetchedFd);

        const existingItem = foodD.find((item) => item.id === fetchedFd.id);
        // setFooditem(fetchFood.items)
        if (existingItem) {
            // If the item exists, update the quantity
            setFooditem((prevItems) =>
                prevItems.map((item) =>
                    item.id === fetchedFd.id ? { ...item, qty: item.qty + fetchedFd.qty } : item
                )
            );
        } else {
            // If the item doesn't exist, add it to the order
            setFooditem((prevItems) => [...prevItems, fetchedFd]);
        }


        console.log("succeessfully here");
        console.log(foodD);
    };


    const [loadfood, setLoadfood] = useState(true);

    const loadItems = () => {
        const indoorFood = fetchFood.items.filter(x => x.orderFrom == "outdoor");
        setFooditem(indoorFood);
        setLoadfood(false);
    }



    const handleIncrement = (itemId) => {
        console.log("on increment ");
        setFooditem((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === itemId) {
                    const newQty = item.qty + 1;
                    const newAmt = (item.price * item.qty);
                    console.log(newAmt, newQty);
                    return { ...item, qty: newQty, amt: newAmt };
                }

                return item;
            });
        });
    };


    const handleDecrement = (itemId) => {
        setFooditem((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === itemId) {
                    const newQuantity = item.qty - 1;
                    const newAmt = (item.price * newQuantity);
                    console.log(newAmt, newQuantity);
                    return newQuantity > 0 ? { ...item, qty: newQuantity, amt: newAmt } : null;
                }
                return item;
            }).filter(Boolean); // Remove null values (items with quantity 0)
        });
    };

    const calculateTotalAmountofItem = () => {

        return foodD.reduce((total, item) => {
            return total + item.qty * item.price;
        }, 0);
    };

    const calculateTotalwithvatdis = () => {
        const total = calculateTotalAmountofItem();
        const vatAmount = (total * bill.VAT) / 100;
        const totalIncludingVAT = total + vatAmount;
        const discountAmount = (totalIncludingVAT * bill.discount) / 100;
        const totalAfterDiscount = totalIncludingVAT - discountAmount;
        var finalTotal;
        if (selectedPaymentType == "creditcard") {
            finalTotal = totalAfterDiscount - bill.creditSale;
        }
        else {
            finalTotal = totalAfterDiscount - bill.cardSale;
        }

        return finalTotal;
    }

    const calculateTotalAmount = (qty, price) => {
        // Calculate total amount based on quantity and price
        // You can customize this logic based on your requirement
        return qty * price;
    };


    // to handel the save order
    const randomOrderNoGenerator = () => {
        const min = 10000000; // Minimum 8-digit number
        const max = 99999999; // Maximum 8-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const orderId = (ordersave) ? randomOrderNoGenerator() : fetchFood.order_no;

    const SaveOrdertoDb = async (current_order) => {

        try {
            const response = await axios.get(`https://restogenius.onrender.com/get_saved_orders/${id}`);

            // Dynamic change here :TODO:
            const outdoorOrder = response.data.filter(x => x.orderFrom == "takeaway");
            if (outdoorOrder.length == 0 ) {
                console.log(response.data);
                try {
                    const response = await axios.post("https://restogenius.onrender.com/save_current_order", current_order)
                    console.log(response.data);
                    toast.success(response.data.message);
                    window.location.reload();
                } catch (error) {
                    console.error(error);
                }
            } else {
                UpdateOrder();
            }
        } catch (error) {
            console.error(error);
        }

    }

    const UpdatetoDb = async (update_order) => {
        try {
            const response = await axios.put(`https://restogenius.onrender.com/update_current_order/${id}`, update_order)
            console.log(response.data);
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };


    const SaveOrder = () => {

        if (customerDetails.name === '' || customerDetails.mobileNumber === '' || customerDetails.email === '' || customerDetails.address === '') {
            toast.error("Please add the Customer details")
        }
        else {
            if (foodD.length === 0) {
                toast.warning("Please add the Orders")
            }

            else {
                const current_order = {
                    order_no: orderId,
                    floor_no: '1', // DYNAMIC TODO:
                    customer_details: customerDetails,
                    items_ordered: foodD.length,
                    items: foodD,
                    total: calculateTotalAmountofItem(),
                    running_order: 'Yes',
                    orderFrom: 'takeaway', //dynamic TODO: 'outdoor' 'countersale' 'deliverysale
                }



                console.log(current_order);


                SaveOrdertoDb(current_order);


            }

            toast.success("Order saved to database", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });


        }


    }

    const UpdateOrder = () => {
        toast.success("Updation successful");
        const update_order = {
            items: foodD,
            items_ordered: foodD.length,
            total: calculateTotalAmountofItem()
        }

        console.log(update_order);

        UpdatetoDb(update_order);
    }

    // for filtering the product
    const [filterOption, setFilterOption] = useState('all');

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const filterHighPrice = () => {
        return data.slice().sort((a, b) => b.foodPrice - a.foodPrice);
    };

    const filterLowPrice = () => {
        return data.slice().sort((a, b) => a.foodPrice - b.foodPrice);
    };

    const filterAvailable = () => {
        return data.filter((item) => item.foodAvailability === 'Yes');
    };

    const filterFoodItems = () => {
        if (filterOption === 'highPrice') {
            return filterHighPrice();
        } else if (filterOption === 'lowPrice') {
            return filterLowPrice();
        } else if (filterOption === 'available') {
            return filterAvailable();
        } else {
            return data; // Default case, no filtering
        }
    };

    const filteredFoodItems = filterFoodItems();

    //   for dynamic food type
    const [foodType, setFoodType] = useState('');
    const [foodTypes, setFoodTypes] = useState([]);

    useEffect(() => {

        const fetchFoodTypes = async () => {
            try {
                const response = await axios.get('https://restogenius.onrender.com/get_food_type');
                setFoodTypes(response.data);
            } catch (error) {
                console.error('Error fetching food types:', error);
            }
        };

        fetchFoodTypes();


    }, []);



    const SuccessfullPayment = async () => {

        try {
    
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    const ClearTheTableData = async () => {
        try {
            // call the server to set the current_order tables to empty,
            const response = await axios.delete(`https://restogenius.onrender.com/delete_current_order/${fetchFood.table_no}`)
            
            toast.success("redirect to new page");

        } catch (error) {
            toast.error(error.message)
            
        }

        try {
            console.log("after deleting the current_order tables",fetchFood.table_no);
            const response2 = await axios.delete(`https://restogenius.onrender.com/delete_running_order/${fetchFood.table_no}`)
            if(response2.data.success){
                window.location.href = '/#/dinein';
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



    const [selectedPaymentType, setSelectedPaymentType] = useState('');

    const handleSelectChange = (e) => {
        const selectedType = e.target.value;
        setSelectedPaymentType(selectedType);

    };


    const handleWaiterChange = (e) => {
        setWaiterName(e.target.value);
    }

    const [waiterName, setWaiterName] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [orderpaymetId, setOrderId] = useState('');
    const [signature, setSignature] = useState('');
    const handlePayBill = async () => {
        // Add logic here to handle the payment
        console.log('Payment processed successfully');
        // You can close the modal or perform other actions after payment
        toast.success("Payment Started to proceeding");

        const customer_details = {
            customer_name: customerDetails.name,
            customer_mobileNumber: customerDetails.mobileNumber,
            customer_email: customerDetails.email,
            customer_address: customerDetails.address,
            order_no: orderId,
            items_ordered: foodD.length,
            items: foodD,
            total: calculateTotalAmountofItem(),
            vat: bill.VAT, // should be dynamic TODO:
            discount: bill.discount, // should be dynamic TODO:
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            type: 'countersale', //TODO: 'coutersale' ,'deliversale'
            orderFrom: 'takeaway',
            paid_by: selectedPaymentType,
            waiter_name: waiterName,

        }

        console.log(customer_details);

        try {

            const response = await axios.post("https://restogenius.onrender.com/save_takeaway_order", customer_details);
            
            if(response.data.success){
                toast.success("Customer detail saved");
                SuccessfullPayment();
            }
            

        } catch (error) {
            console.error('Error:', error);
        }


        closeModalPayBill();
    };





    return (
        <div className='over-order-page'>
            {usercreated ? <button type="button" className='btn btn-primary mt-2 ms-3' onClick={openModal}>
                Add User
            </button> : <div>
                <p className='ms-3 mt-3'>Customer name: <span className='text-capitalize fw-bold'>{customerDetails.name}</span> </p>
                <p className='ms-3'>Customer Phone: <span className='text-capitalize fw-bold'>{customerDetails.mobileNumber}</span></p>
                <p className='ms-3'>Customer email: <span className='text-capitalize fw-bold'>{customerDetails.email}</span></p>
                <p className='ms-3'>Customer Address: <span className='text-capitalize fw-bold'>{customerDetails.address}</span></p>
                {/* <button type="button" className='btn btn-primary mt-2 ms-3' onClick={openUpdateModal}>
                Update user (seprate modal)
            </button> */}
            </div>}
            <div className="pop-cont">
                {/* Your other content goes here */}

                {isModalOpen && (
                    <div className="modal-overlay1">
                        <div className="modal1">
                            <button type="button" className="close-btn" onClick={closeModal}>
                                &times;
                            </button>
                            <h2>Customer Details</h2>
                            <form>
                                <label>
                                    Customer Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={customerDetails.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Mobile Number:
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={customerDetails.mobileNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        // placeholder={fetchFood.customer_details.numberOfSeats}
                                        value={customerDetails.email}
                                        onChange={handleInputChange}
                                        required
                                        
                                    />
                                </label>
                                <label>
                                    Address:
                                    <input
                                        type="text"
                                        name="address"
                                        // placeholder={fetchFood.customer_details.numberOfSeats}
                                        value={customerDetails.address}
                                        onChange={handleInputChange}
                                        required
                                        
                                    />
                                </label>
                                <button type="button" onClick={handleSave} className="save-btn">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
          
            <div className='row g-3'>
                <div className='dinein-navbar-cont'>

                    <div className='info-cont'>
                        <a href="#" className="running-order" style={{ 'color': '#000' }}>OrderNo #{orderId}</a>
                        {/* <a href="#" className="running-order" style={{ backgroundColor: "#FF7F7F", borderColor: "#FF7F7F", color: '#000' }}>Floor No 1</a>
                        <p className="running-order" style={{ backgroundColor: "#009946", borderColor: "#009946", color: '#000' }}>Table {id}</p>
                        <p className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }}>Seats {ordersave ? customerDetails.numberOfSeats : fetchFood.customer_details.numberOfSeats}</p>
                        <p className="running-order" style={{ backgroundColor: "#FF9D08", borderColor: "#FF9D08", color: '#000' }}>Waiter name </p> */}
                    </div>
                    <div className='pay-cont'>

                        {/* <button className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }} onClick={() => {
                            ordersave ? SaveOrder() : UpdateOrder()
                        }}>{ordersave ? 'Save order' : 'Update Order'}<ToastContainer /></button> */}
                        <p className="running-order" style={{ backgroundColor: "#FF9D08", borderColor: "#FF9D08", color: '#000' }}>Print Reciept </p>
                        <button onClick={openModelPaybill} className="running-order" style={{ backgroundColor: "#009946", borderColor: "#009946", color: '#000' }}>Pay Bill

                        </button>
                    </div>

                    {/* start of popup */}
                    {modalOpen && (
                        <div className="modal-overlay-1">
                            <div className="modal-1" >
                                <div className="modal-header-1">
                                    <h2>Food Order Details</h2>
                                    <button type="button" className="close-btn-pb" onClick={closeModalPayBill}>
                                        &times;
                                    </button>
                                </div>
                                <div className='orderCont-paybill'>
                                    <ul class="responsive-table-popup">
                                        <li class="otable-header">
                                            <div class="colo colo-1">Id</div>
                                            <div class="colo colo-2">Name</div>
                                            <div class="colo colo-5">Quantity</div>
                                            <div class="colo colo-3">Price</div>
                                            <div class="colo colo-4">Amount</div>
                                        </li>

                                        {/* Dynamic TODO: */}
                                        {foodD && foodD.filter(x => x.orderFrom == "takeaway").map((val, idx) => {
                                            return (
                                                <>
                                                    <li class="otable-row">
                                                        <div class="colo colo-1" data-label="Job Id">{val.id}</div>
                                                        <div class="colo colo-2" data-label="Customer Name">{val.foodname}</div>
                                                        <div class="colo colo-5" data-label="Amount">{val.qty}</div>
                                                        <div class="colo colo-3" data-label="Amount">{val.price}</div>
                                                        <div class="colo colo-4" data-label="Payment Status">{calculateTotalAmount(val.qty, val.price)}</div>
                                                    </li>

                                                </>
                                            )
                                        })}
                                    </ul>
                                    <div className="order-details-row">
                                        <p>Total: AED{calculateTotalAmountofItem()}</p>
                                    </div>

                                </div>


                                <div>
                                    <label>Waiter Name: </label>
                                    <select id="foodCategory" onChange={handleWaiterChange} value={waiterName || ''}>
                                        <option value="" disabled>
                                            Waiter handled
                                        </option>

                                        {waiter && waiter.map((type) => (
                                            <option key={type.waiterName} value={type.waiterName}>
                                                {type.waiterName}
                                            </option>
                                        ))}
                                    </select>
                                    <label>Select Payment Type:</label>
                                    <select value={selectedPaymentType} onChange={handleSelectChange}>
                                        <option value="">Select...</option>
                                        <option value="creditcard">Credit Card</option>
                                        <option value="upi">UPI</option>
                                        <option value="debitcard">Debit Card</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                    <div className='row'>
                                        <div className="col">

                                            {selectedPaymentType == "creditcard" ? <p>{selectedPaymentType} offer {bill.creditSale}</p>
                                                : ""}
                                            {selectedPaymentType == "debitcard" ? <p>Card offer {bill.cardSale}</p>
                                                : ""}

                                            {<p>Discount: {bill.discount}</p>}
                                        </div>
                                        <div className="col">
                                            <div className="order-details-row">
                                                <p>VAT:{bill && bill.VAT}</p>
                                                %

                                            </div>
                                            <div className="order-details-row">
                                                <p>After Applying:</p>
                                                <p>AED
                                                    {calculateTotalwithvatdis()}</p>

                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <button className="btn btn-success" onClick={handlePayBill} >Pay Bill</button>
                            </div>

                        </div>
                    )}

                    {/* end of popup */}
                </div>
                {/* layout -1 */}
                <div className='col-sm-6'>
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
                            {/* save to db and fetch from there DYNAMIC TODO:*/}
                            {foodD.length > 0 && foodD.filter(x => x.orderFrom == "takeaway").map((food) => (
                                < TableorderCard fooditem={food}
                                    onDecrement={handleDecrement}
                                    onIncrement={handleIncrement}
                                // onAmountChange={handleAmount}
                                />
                            ))

                            }

                            {ordersave ? '' :
                                loadfood && (
                                    <>
                                        <button className='btn btn-primary' onClick={loadItems} > load data</button>
                                    </>)

                            }


                        </ul>
                        {/* the total goes here */}
                        <div>
                            <h5>Total: AED {calculateTotalAmountofItem()} </h5>
                        </div>
                    </div>
                </div>
                {/* layout - 2 */}
                <div className='col-sm-5'>
                    <div className='food-order-cont'>
                        <div className='food-category-bar'>
                            <div className='foo-cat'>
                                <span htmlFor="foodCategory">Food Category</span>

                                <select id="foodCategory" onChange={handleCategoryChange} value={selectedCategory || ''}>
                                    <option value="" disabled>
                                        Select Food Type to filter
                                    </option>
                                    {foodTypes.map((type) => (
                                        <option key={type.food_name} value={type.food_name}>
                                            {type.food_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='foo-cat'>
                                <span htmlFor="foodCategory">Sort-by or Filter</span>
                                <select id="foodCategory" onChange={handleFilterChange} value={filterOption}>
                                    <option value="all">All</option>
                                    <option value="highPrice">High Price</option>
                                    <option value="lowPrice">Low Price</option>
                                    <option value="available">Available</option>
                                </select>
                            </div>

                            <div className='date-time'>

                                <GetDate />
                                <br></br>
                                <GetTime />
                            </div>

                        </div>
                        <div>

                            {
                                <DynamicComponent
                                    fooddata={filteredFoodItems}
                                    foodtype={selectedCategory}
                                />
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default TakeAway;


