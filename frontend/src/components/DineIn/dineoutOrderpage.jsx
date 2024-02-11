import React, { useEffect, useRef, useState } from 'react';
import "./dinein.css"
import { useParams } from 'react-router-dom';
import Quanttity from '../../cards/QuantityCards/Quanttity';
import FoodCard from '../../cards/FoodCards/FoodCard';
import FoodApi from '../../api/foodapi';
import TableorderCard from '../../cards/Table/TableorderCard';
import TableBody from '../../cards/Table/tableBody';
import Paybillpopup from '../../cards/PopupCards/Paybillpopup';
import GetDate from '../../cards/TimeandDate/GetDate';
import GetTime from '../../cards/TimeandDate/GetTime';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';





const DineoutOrderpage = () => {

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
            const response = await axios.get('http://localhost:9999/table_data');
            setTableData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [waiter, setWaiter] = useState([]);
    const fetchWaiter = async () => {
        try {
            const response = await axios.get('http://localhost:9999/get_waiter');
            console.log(response.data);
            setWaiter(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [bill, setBill] = useState([]);
    const fetchBillD = async () => {
        try {
            const response = await axios.get('http://localhost:9999/get_billd');
            console.log(response.data);
            setBill(response.data[0]);

        } catch (error) {
            console.log(error.message);
        }
    };

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/get_food_data');
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
            const response = await axios.get(`http://localhost:9999/get_saved_orders/${id}`);
            console.log(response.data);

            // DYnmic changeHere :TODO:
            const outdoorSavedOrder = response.data.filter(x => x.orderFrom == "outdoor");
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
        numberOfSeats: '',
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

        const gettotppl = tableData.filter(x => x.table_no == id);
        console.log(gettotppl);
        if (customerDetails.numberOfSeats > gettotppl[0].table_capacity) {
            toast.error(`Seats Max Capacity is ${gettotppl[0].table_capacity}`);
        }
        else {
            console.log('Customer Details:', customerDetails);

            // need to set thge layout for 
            setCustomerstate();

            // Close the modal
            closeModal();
        }
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
            table_no: id,
            orderFrom: "outdoor", //Dynamic TODO:
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
        console.log("foods", indoorFood);
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
            const response = await axios.get(`http://localhost:9999/get_saved_orders/${id}`);

            // Dynamic change here :TODO:
            const outdoorOrder = response.data.filter(x => x.orderFrom == "outdoor");
            if (outdoorOrder.length == 0 ) {
                console.log(response.data);
                try {
                    const response = await axios.post("http://localhost:9999/save_current_order", current_order)
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
            const response = await axios.put(`http://localhost:9999/update_current_order/${id}`, update_order)
            console.log(response.data);
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };


    const SaveOrder = () => {

        if (customerDetails.name === '' || customerDetails.mobileNumber === '' || customerDetails.numberOfSeats === '') {
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
                    table_no: id,
                    customer_details: customerDetails,
                    items_ordered: foodD.length,
                    items: foodD,
                    no_of_seats: customerDetails.numberOfSeats,
                    total: calculateTotalAmountofItem(),
                    running_order: 'Yes',
                    orderFrom: 'outdoor', //dynamic TODO: 'outdoor' 'countersale' 'deliverysale
                    waiterName: waiterName,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
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
                const response = await axios.get('http://localhost:9999/get_food_type');
                setFoodTypes(response.data);
            } catch (error) {
                console.error('Error fetching food types:', error);
            }
        };

        fetchFoodTypes();


    }, []);



    const SuccessfullPayment = async () => {

        try {
            const update_data = {
                razorpay_payment_id: '',
                razorpay_order_id: '',
                razorpay_signature: '',
            }
            console.log(update_data);
            const response = await axios.put(`http://localhost:9999/update_customer_details/${fetchFood.order_no}`,
                update_data);
            // toast.success("Payment done successfull So set the table to  000")

            ClearTheTableData();
        } catch (error) {
            alert(error.message);
        }
    }

    const ClearTheTableData = async () => {
        try {
            // call the server to set the current_order tables to empty,
            if(fetchFood.orderFrom == "indoor"){
                try {
                    const res = await axios.delete(`http://localhost:9999/delete_current_indoor_order/${fetchFood.table_no}`);
                    console.log(res.data);
                } catch (error) {
                    console.log(error.message);
                }
            }else{
                try {
                    const res = await axios.delete(`http://localhost:9999/delete_current_outdoor_order/${fetchFood.table_no}`);
                    console.log(res.data);
                } catch (error) {
                    console.log(error.message);
                }
            }
            
            toast.success("redirect to new page");

        } catch (error) {
            toast.error(error.message)
            
        }

        try {
            console.log("after deleting the current_order tables",fetchFood.table_no);
            if(fetchFood.orderFrom == "indoor"){
                try {
                    const res = await axios.delete(`http://localhost:9999/delete_running_indoor_order/${fetchFood.table_no}`);
                    console.log(res.data);
                    if(res.data.success){
                        window.location.href = '/#/dinein';
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }else{
                try {
                    const res = await axios.delete(`http://localhost:9999/delete_running_outdoor_order/${fetchFood.table_no}`);
                    console.log(res.data);
                    if(res.data.success){
                        window.location.href = '/#/dinein';
                    }
                } catch (error) {
                    console.log(error.message);
                }
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
            customer_name: fetchFood.customer_details.name,
            customer_mobileNumber: fetchFood.customer_details.mobileNumber,
            order_no: fetchFood.order_no,
            items_ordered: fetchFood.items_ordered,
            items: fetchFood.items,
            total: fetchFood.total,
            vat: bill.VAT, // should be dynamic TODO:
            discount: bill.discount,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            type: 'dineout', //TODO: 'coutersale' ,'deliversale'
            orderFrom: fetchFood.orderFrom,
            ordered_tableno: fetchFood.table_no,
            total_ppl: fetchFood.no_of_seats,
            paid_by: selectedPaymentType,
            razorpay_payment_id: 'from razorpay',
            razorpay_order_id: 'from razorpay',
            razorpay_signature: 'from razorpay',
            waiter_name: waiterName,

        }

        console.log(customer_details);

        try {

            const response = await axios.post("http://localhost:9999/save_customer_details", customer_details);
            const order = customer_details;
            const order_id = response.data.order_id;


            // const options = {
            //     key: 'rzp_test_AZ9LyozDGv5aSK',
            //     key_secret: 'k7q5Fkbd9EAoJaJ5JPl5dzrH',
            //     amount: order.total , //dynamic
            //     currency: 'AED',
            //     name: 'FZE Restaurant',
            //     description: 'Pyament for a resturant food',
            //     order_id: order_id, // dynamic
            //     handler: function (response) {
            //         // Handle the payment success
            //         alert(response.razorpay_payment_id);
            //         alert(response.razorpay_order_id);
            //         alert(response.razorpay_signature)
            //         setPaymentId(response.razorpay_payment_id || '');
            //         setOrderId(response.razorpay_order_id || '');
            //         setSignature(response.razorpay_signature || '');
            //         setTimeout(() => {
            //             SuccessfullPayment(response.razorpay_payment_id,response.razorpay_order_id,
            //                 response.razorpay_signature);
            //         }, 2000);
            //     },
            //     prefill: {
            //         name: order.customer_name, // dynamic
            //         contact: order.customer_mobileNumber, // dynamic
            //     },
            //     theme: {
            //         color: '#528FF0', // restuarant theme
            //     },
            // };

            // const razorpay = new window.Razorpay(options);
            // razorpay.open();
            SuccessfullPayment();

        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            SuccessfullPayment();
        }


        closeModalPayBill();
    };





    return (
        <div className='over-order-page'>
            {usercreated ? <button type="button" className='btn btn-primary mt-2 ms-3' onClick={openModal}>
                Add User
            </button> : <div>
                <p className='ms-3 mt-3'>Customer name: <span className='text-capitalize fw-bold'>{!ordersave ? fetchFood.customer_details.name : customerDetails.name}</span> </p>
                <p className='ms-3'>Customer Phone: <span className='text-capitalize fw-bold'>{!ordersave ? fetchFood.customer_details.mobileNumber : customerDetails.mobileNumber}</span></p>
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
                                    Number of Seats:
                                    <input
                                        type="number"
                                        name="numberOfSeats"
                                        // placeholder={fetchFood.customer_details.numberOfSeats}
                                        value={customerDetails.numberOfSeats}
                                        onChange={handleInputChange}
                                        required
                                        max={4}
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
            <div className="pop-cont">
                {/* Your other content goes here */}

                {isupdateModalOpen && (
                    <div className="modal-overlay1">
                        <div className="modal1">
                            <button type="button" className="close-btn" onClick={closeUpdateModal}>
                                &times;
                            </button>
                            <h2>Update Customer Details</h2>
                            <form>
                                <label>
                                    Customer Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={customerDetails.name}
                                        // defaultValue={fetchFood.customer_details.name}

                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Mobile Number:
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        // defaultValue={fetchFood.customer_details.mobileNumber}
                                        value={customerDetails.mobileNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Number of Seats:
                                    <input
                                        type="number"
                                        name="numberOfSeats"
                                        // placeholder={fetchFood.customer_details.numberOfSeats}
                                        // defaultValue={fetchFood.customer_details.numberOfSeats}
                                        value={customerDetails.numberOfSeats}
                                        onChange={handleInputChange}
                                        required
                                        max={4}
                                        maxLength={6}
                                    />
                                </label>
                                <button type="button" onClick={handleSave} className="save-btn">
                                    Update
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
                        <a href="#" className="running-order" style={{ backgroundColor: "#FF7F7F", borderColor: "#FF7F7F", color: '#000' }}>Floor No 1</a>
                        <p className="running-order" style={{ backgroundColor: "#009946", borderColor: "#009946", color: '#000' }}>Table {id}</p>
                        <p className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }}>Seats {ordersave ? customerDetails.numberOfSeats : fetchFood.customer_details.numberOfSeats}</p>
                        <select style={{display:`${fetchFood.waiterName ? 'none' : ''}`}} id="foodCategory" onChange={handleWaiterChange} value={waiterName || ''}>
                                        <option value="" disabled>
                                            Waiter handled
                                        </option>

                                        {waiter && waiter.map((type) => (
                                            <option key={type.waiterName} value={type.waiterName}>
                                                {type.waiterName}
                                            </option>
                                        ))}
                                    </select>
                        <p className="running-order" style={{ backgroundColor: "#FF9D08", borderColor: "#FF9D08", color: '#000' }}>{waiterName ? waiterName : fetchFood.waiterName} </p>
                      
                    </div>
                    <div className='pay-cont'>

                        <button className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }} onClick={() => {
                            ordersave ? SaveOrder() : UpdateOrder()
                        }}>{ordersave ? 'Save order' : 'Update Order'}<ToastContainer /></button>
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
                                        {foodD && foodD.filter(x => x.orderFrom == "outdoor").map((val, idx) => {
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
                                   
                                    <label>Waiter Name: {fetchFood.waiterName ? fetchFood.waiterName : waiterName}</label>
                                    {/* <select id="foodCategory" onChange={handleWaiterChange} value={waiterName || ''}>
                                        <option value="" disabled>
                                            Waiter handled
                                        </option>

                                        {waiter && waiter.map((type) => (
                                            <option key={type.waiterName} value={type.waiterName}>
                                                {type.waiterName}
                                            </option>
                                        ))}
                                    </select> */}
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
                            {foodD.length > 0 && foodD.filter(x => x.orderFrom == "outdoor").map((food) => (
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

export default DineoutOrderpage;

