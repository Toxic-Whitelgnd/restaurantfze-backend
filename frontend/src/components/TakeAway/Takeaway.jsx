import React, { useEffect, useRef, useState } from 'react';
import "./takeaway.css"
import { useParams } from 'react-router-dom';

import TableorderCard from '../../cards/Table/TableorderCard';

import GetDate from '../../cards/TimeandDate/GetDate';
import GetTime from '../../cards/TimeandDate/GetTime';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa';

import DynamicComponent from '../../cards/DynamicComponent/DynamicComponent';


const TakeAway = () => {

    const { id } = useParams();

    const dynamicurl = `https://restogenius.onrender.com/`

    // Componet's are Dynamic 
    /*
    const DynamicComponent = ({ fooddata, foodtype, foodterm }) => (
        <>
            <div className='d-flex flex-wrap gap-2 mt-2 row-gap-3'>

                {
                    foodtype == 'all' ? fooddata.filter(x => x.foodName.toLowerCase().includes(foodterm.toLowerCase())).map((val, idx) => {
                        return (
                            <>
                                <div key={idx} className="my-alert">
                                    <div className="my-alert__unique1">
                                        {val.foodImage && (
                                            <img src={`data:image/jpeg;base64,${val.foodImage}`} alt={val.foodName} className='img-card' />
                                        )}

                                    </div>
                                    {val.foodAvailability === 'Yes' ? <span class="badge position-relative translate-middle aval" style={{ backgroundColor: 'green' }}>'</span> : <span class="badge position-relative translate-middle notaval" style={{ backgroundColor: 'red' }}>'</span>}
                                    <div className="my-alert__unique2">
                                        <div className='my-alert__unique3'>
                                            <div className='my-alert__unique4'>
                                                <span className='fs-6 fw-bold text-capitalize'>{val.foodName}</span>
                                                <p className='fs-6'>{val.foodQty == 0 ? '' : val.foodQty}</p>
                                            </div>
                                            <span className='mt-3 fw-semibold'>AED {val.foodPrice}</span>

                                        </div>
                                        {val.foodAvailability === 'No' ? <button
                                            className='btn cust-btn-cart' onClick={() => handleFoodItem(val)}
                                            type='button' disabled
                                        >Add</button> :
                                            <button
                                                className='btn cust-btn-cart' onClick={() => handleFoodItem(val)}
                                                type='button'
                                            >Add</button>}

                                    </div>
                                </div>
                            </>
                        )
                    })

                        : fooddata.filter(x => x.foodType === foodtype).filter(x => x.foodName.toLowerCase().includes(foodterm.toLowerCase())).map((val, idx) => {
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
                                            >Add</button> :
                                                <button
                                                    className='btn cust-btn-cart' onClick={() => handleFoodItem(val)}
                                                    type='button'
                                                >Add</button>}

                                        </div>
                                    </div>
                                </>
                            )
                        })

                }


                {/* {

fooddata.filter(x => x.foodType === foodtype ||  x.foodName.toLowerCase().includes(foodterm.toLowerCase())).map((val, idx) => {
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
} }
            </div>
        </>
    )
    */
    // componet ending

    // from server side rendering


    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();

        fetchCurrentOrder();

        fetchWaiter();

        fetchTableData();

        fetchBillD();

        GenerateOrderNo();
    }, []);

    const [orderNou, setOrderNo] = useState(0);
    const GenerateOrderNo = () => {
        const orderId = randomOrderNoGenerator();
        setOrderNo(orderId);
    }


    const [tableData, setTableData] = useState([]);
    const fetchTableData = async () => {
        try {
            const response = await axios.get(`${dynamicurl}table_data`);
            setTableData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    }

    const [waiter, setWaiter] = useState([]);
    const fetchWaiter = async () => {
        try {
            const response = await axios.get(`${dynamicurl}get_waiter`);
            console.log(response.data);
            setWaiter(response.data);
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    }

    const [bill, setBill] = useState([]);
    const fetchBillD = async () => {
        try {
            const response = await axios.get(`${dynamicurl}get_billd`);
            console.log(response.data);
            setBill(response.data[0]);

        } catch (error) {
            console.log(error.message);
        }
    };

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${dynamicurl}get_food_data`);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usercreated, setUsercreated] = useState(true);

    const [fetchFood, setFetchFood] = useState(``);
    const [ordersave, setOrdersave] = useState(true);


    const fetchCurrentOrder = async () => {
        try {
            const response = await axios.get(`${dynamicurl}get_saved_orders/${id}`);
            console.log(response.data);

            // DYnmic changeHere :TODO:
            const outdoorSavedOrder = response.data.filter(x => x.orderFrom == "takeaway");
            console.log("Here");
            if (outdoorSavedOrder == ``) {
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
            console.error(`Error fetching data:`, error);
        }
    };

    // end of serverside rendering

    const [customerDetails, setCustomerDetails] = useState({
        name: `customer`,
        mobileNumber: `9999`,
        email: `customer@gmail.com`,
        address: `customer address`,
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



        console.log(`Customer Details:`, customerDetails);

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

    const [selectedCategory, setSelectedCategory] = useState('all');

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
            orderno: orderNou,
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
            // If the item doesn`t exist, add it to the order
            setFooditem((prevItems) => [...prevItems, fetchedFd]);
        }


        console.log("succeessfully here");
        console.log(foodD);
    };


    const [loadfood, setLoadfood] = useState(true);

    const loadItems = () => {
        const indoorFood = fetchFood.items.filter(x => x.orderFrom == "takeaway");
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



    const SaveOrdertoDb = async (current_order) => {

        try {

            const response = await axios.post(`${dynamicurl}save_current_takeaway_order`, current_order)
            console.log(response.data);
            if (response.data.success) {
                toast.success(response.data.message);
                // window.location.reload();
                handleRecieptoKitchen(current_order.order_no);
            }



        }
        catch (error) {
            console.error(error.message);
        }
    }

    const UpdatetoDb = async (update_order) => {
        try {
            const response = await axios.put(`${dynamicurl}update_current_order/${id}`, update_order)
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
                    order_no: orderNou,
                    floor_no: '1', // DYNAMIC TODO:
                    customer_details: customerDetails,
                    items_ordered: foodD.length,
                    items: foodD,
                    total: calculateTotalAmountofItem(),
                    running_order: 'Yes',
                    orderFrom: 'takeaway', //dynamic TODO: 'outdoor' 'countersale' 'deliverysale
                }



                console.log(current_order);

                handlePayBill();
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
                const response = await axios.get(`${dynamicurl}get_food_type`);
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
            const response = await axios.delete(`${dynamicurl}delete_current_order/${fetchFood.table_no}`)

            toast.success("redirect to new page");

        } catch (error) {
            toast.error(error.message)

        }

        try {
            console.log("after deleting the current_order tables", fetchFood.table_no);
            const response2 = await axios.delete(`${dynamicurl}delete_running_order/${fetchFood.table_no}`)
            if (response2.data.success) {
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

        //SaveOrder();
        toast.success("Payment Started to proceeding");

        const customer_details = {
            customer_name: customerDetails.name,
            customer_mobileNumber: customerDetails.mobileNumber,
            customer_email: customerDetails.email,
            customer_address: customerDetails.address,
            order_no: orderNou,
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
            amountpaid: totalAmount, //TODO: NEED TO ADD DYNAMICALLY
            amountbalance: calculateTotalwithvatdis() - totalAmount, //todo: same 
            receiptNo: `GH-${generateRandomNumber()}`,
            totalwithoutvat: calculateTotalAmountofItem(),

        }

        console.log(customer_details);

        try {

            const response = await axios.post(`${dynamicurl}save_takeaway_order`, customer_details);

            if (response.data.success) {
                toast.success("Customer detail saved");
                //SuccessfullPayment();

            }


        } catch (error) {
            console.error('Error:', error);
        }


        closeModalPayBill();
    };

    const handlePayBillPay = async () => {
        // Add logic here to handle the payment
        console.log('Payment processed successfully');
        // You can close the modal or perform other actions after payment

        //SaveOrder();
        toast.success("Payment Started to proceeding");

        const customer_details = {
            customer_name: customerDetails.name,
            customer_mobileNumber: customerDetails.mobileNumber,
            customer_email: customerDetails.email,
            customer_address: customerDetails.address,
            order_no: orderNou,
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
            amountpaid: totalAmount, //TODO: NEED TO ADD DYNAMICALLY
            amountbalance: calculateTotalwithvatdis() - totalAmount, //todo: same 
            receiptNo: `GH-${generateRandomNumber()}`,
            totalwithoutvat: calculateTotalAmountofItem(),

        }

        console.log(customer_details);

        try {

            const response = await axios.post(`${dynamicurl}save_takeaway_order`, customer_details);

            if (response.data.success) {
                toast.success("Customer detail saved");
                SuccessfullPayment();

            }


        } catch (error) {
            console.error('Error:', error);
        }


        closeModalPayBill();
    };

    const [totalAmount, setTotalAmount] = useState(0);

    const handleAmountChange = (e) => {
        setTotalAmount(e.target.value);
    };

    const [randomNumber, setRandomNumber] = useState(null);

    const generateRandomNumber = () => {
        const min = 10000;
        const max = 99999;
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(rand);
        return rand;
    };

    const handleReciept = () => {
        console.log("check here");
        // TODO: aFTER SAVING THE ORDER ONLY MAKE THIS TO PRINT BILL OR WHEN CLICK ON PRINTBILL JUST CHECK 
        // IF IT SAVED OR NOT IF NOT JUST SAVE IT?? 


        window.location.href = `/#/printrecipiet/${fetchFood.order_no}`;
    }

    const handleRecieptoKitchen = (orderno) => {
        window.location.href = `/#/print/kitchen/takeaway/${orderno}`;
    };


    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange1 = (e) => {
        setSearchTerm(e.target.value);
    }


    const printText = async () => {
        try {
            const response = await fetch('http://localhost:9999/print', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                console.log('Print initiated successfully');
            } else {
                console.error('Print failed');
            }
        } catch (error) {
            console.error('Error triggering print:', error);
        }
    };


    return (
        <div className='over-order-page'>
            <div className='inside-container'>
                {usercreated ? 
                
                <button type="button" className='adduser' class="add-user-btn" onClick={openModal}>
                    Add User
                </button>
                
                : <div className='row'>
                    <p className='mt-1 col-md-3'>Customer name: <span className='text-capitalize fw-bold'>{customerDetails.name}</span> </p>
                    <p className='mt-1 col-md-3'>Customer Phone: <span className='text-capitalize fw-bold'>{customerDetails.mobileNumber}</span></p>
                    <p className='mt-1 col-md-3'>Customer email: <span className='text-capitalize fw-bold'>{customerDetails.email}</span></p>
                    <p className='mt-1 col-md-3'>Customer Address: <span className='text-capitalize fw-bold'>{customerDetails.address}</span></p>
                    {/* <button type="button" className='btn btn-primary mt-2 ms-3' onClick={openUpdateModal}>
                    Update user (seprate modal)
                </button> */}
                </div>}
                <div className="pop-cont">
                    {/* Your other content goes here */}

                    {isModalOpen && (
                        <div className="modal-overlay1">
                            <div className="model3">
                                <button type="button" className="close-btn" onClick={closeModal}>
                                    &times;
                                </button>
                                <h2 id='takwaway-headinh-h2'>Customer Details</h2>
                                <form class="takeaway-form">
                                    <label class="takeaway-name-la">
                                        Customer Name:</label>
                                        <input
                                            type="text"
                                            name="takeaway-name"
                                            value={customerDetails.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    
                                    <label class="takeaway-no-la">
                                        Mobile Number:</label>
                                        <input
                                            type="tel"
                                            name="takeaway-number"
                                            value={customerDetails.mobileNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    
                                    <label class="takeaway-email-la">
                                        Email: </label>
                                        <input
                                            type="email"
                                            name="takeaway-email"
                                            // placeholder={fetchFood.customer_details.numberOfSeats}
                                            value={customerDetails.email}
                                            onChange={handleInputChange}
                                            required

                                        />
                
                                    <label class="takeaway-add-la">
                                        Address:</label>
                                        <input
                                            type="text"
                                            name="takeaway-address"
                                            // placeholder={fetchFood.customer_details.numberOfSeats}
                                            value={customerDetails.address}
                                            onChange={handleInputChange}
                                            required
                                        />

                                    <button type="button" onClick={handleSave} className="save-btn">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                <div className='row'>
                    <div className='dinein-navbar-cont' class="dinein-nav">

                        <div>
                            <p className="static-running-order" class="orderNo">OrderNo #{orderNou}</p>
                            {/* <a href="#" className="running-order" style={{ backgroundColor: "#FF7F7F", borderColor: "#FF7F7F", color: '#000' }}>Floor No 1</a>
                            <p className="running-order" style={{ backgroundColor: "#009946", borderColor: "#009946", color: '#000' }}>Table {id}</p>
                            <p className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }}>Seats {ordersave ? customerDetails.numberOfSeats : fetchFood.customer_details.numberOfSeats}</p>
                            <p className="running-order" style={{ backgroundColor: "#FF9D08", borderColor: "#FF9D08", color: '#000' }}>Waiter name </p> */}
                        </div>
                        <div className='pay-cont' class="pay-cont">
                            <ToastContainer />
                            {/* <button className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }} onClick={() => {
                                ordersave ? SaveOrder() : UpdateOrder()
                            }}>{ordersave ? 'Save order' : 'Update Order'}<ToastContainer /></button> */}
                            <button className="running-order" onClick={printText} style={{ backgroundColor: "#ACE4AA", borderColor: "#FF9D08", color: '#000' }}>Receipt </button>
                            <button onClick={SaveOrder} className="running-order" style={{ backgroundColor: "#ACE4AA", borderColor: "#009946", color: '#000' }}>KOT</button>
                            <button onClick={openModelPaybill} className="running-order" style={{ backgroundColor: "#ACE4AA", borderColor: "#009946", color: '#000' }}>Bill</button>

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
                                                        <li class="otable-row-takeway">
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
                                        <div className="totalAed" class="totalAed">
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
                                            <option value="creditsale">Credit sale</option>
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
                                    <div className='col'>
                                        <label>
                                            Total Amount Paid:
                                            <input
                                                type="number"
                                                value={totalAmount}
                                                onChange={handleAmountChange}
                                                placeholder="Enter total amount paid"
                                                required
                                            />
                                        </label>
                                    </div>
                                    <button className="btn btn-success" onClick={handlePayBillPay} >Pay Bill</button>
                                </div>

                            </div>
                        )}

                        {/* end of popup */}
                    </div>
                    {/* layout -1 */}
                    <div className='col-sm-6'>
                        <div className='orderCon'>
                            <h5 className='d-flex text-align-center' class="track-order-h5">Track your order here</h5>
                            <ul class="responsive-table">
                                <li class="otable-header" style={{ backgroundColor: '#B84A62', padding: '10px', borderRadius: '10px' }}>
                                    <div class="colo colo-1" style={{fontWeight:'bold'}}>Id</div>
                                    <div class="colo colo-2" style={{ fontWeight: 'bold' }}>Name</div>
                                    <div class="colo colo-5" style={{ fontWeight: 'bold' }}>Quantity</div>
                                    <div class="colo colo-3" style={{ fontWeight: 'bold' }}>Price</div>
                                    <div class="colo colo-4" style={{ fontWeight: 'bold' }}>Amount</div>
                                </li>
                                {/* the total goes here */}
                                <div class="mainpage-aed">
                                    <h5>Total: AED {calculateTotalAmountofItem()} </h5>
                                </div>

                                <div class="orderSummary-takeaway">
                                {/* save to db and fetch from there DYNAMIC TODO:*/}
                                {foodD.length > 0 && foodD.filter(x => x.orderFrom == "takeaway").map((food) => (
                                    < TableorderCard fooditem={food}
                                        onDecrement={handleDecrement}
                                        onIncrement={handleIncrement}
                                    // onAmountChange={handleAmount}
                                    />
                                ))

                                }
                                </div>

                                {ordersave ? '' :
                                    loadfood && (
                                        <>
                                            <button className='btn btn-primary' onClick={loadItems} > load data</button>
                                        </>)

                                }
                            </ul>
                
                        </div>
                    </div>
                    {/* layout - 2 */}
                    <div className='col-sm-6'>
                        <div className='food-display'>
                            <div className='food-category-bar' style={{ backgroundColor: '#B84A62', borderRadius: '5px' }}>
                                <div className='foo-cat'>
                                    {/* <span htmlFor="foodCategory" style={{fontWeight:'bold'}}>Food Category</span> */}
                                    <label className='foodCategory'>Food Category</label>
                                    <select id="foodCategory" onChange={handleCategoryChange} value={selectedCategory || ''} className='filter'>
                                        <option value="all" >
                                            All
                                        </option>
                                        {foodTypes.map((type) => (
                                            <option key={type.food_name} value={type.food_name}>
                                                {type.food_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className='foo-cat'>
                                    <span htmlFor="foodCategory" style={{ fontWeight: 'bold', height: '0.7cm'}}>Sort-by or Filter</span>
                                    <select id="foodCategory" onChange={handleFilterChange} value={filterOption} className='filter'>
                                        <option value="all">All</option>
                                        <option value="highPrice">High Price</option>
                                        <option value="lowPrice">Low Price</option>
                                        <option value="available">Available</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="search-container">
                                        <input
                                            className='search-container-searchbar'
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={handleInputChange1}
                                        />
                                        <FaSearch className="search-icon" />
                                    </div>
                                </div>


                            </div>
                            <div class="food-data">
                                {
                                    <DynamicComponent
                                        fooddata={filteredFoodItems}
                                        foodtype={selectedCategory}
                                        foodterm={searchTerm}
                                        handleFoodItem={handleFoodItem}
                                    />
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default TakeAway;


