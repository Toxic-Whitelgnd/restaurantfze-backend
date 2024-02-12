import React, { useEffect, useState } from 'react';
import "./dinein.css"
import DineinTables from '../api/dineintablesapi';
import DineInCards from '../../cards/DineInCards/DineInCards';
import axios from 'axios';

const IndoorContent = ({ indoorTables }) => (
    <div>
        <h2>Indoor Tables </h2>
        
        <div className='indoor-cont'>
            {
                indoorTables && indoorTables
                    .filter(x => x.table_type == 'indoor')
                    .map((val, idx) => {
                        return (
                            <>
                                <div key={idx}>
                                    <DineInCards
                                        tableno={val.table_no}
                                        totcapacity={val.table_capacity}
                                        pploccupied={val.table_pploccupied}
                                        icon={val.table_icon}
                                        backgroundcolor={val.table_color}
                                        urlToPage={val.table_url}
                                        tabletaken={val.table_taken}
                                        itemsord={val.table_itemsordered}
                                    />
                                </div>
                            </>
                        )
                    })
            }
        </div>
    </div>
);

const OutdoorContent = ({ outdoorTables }) => (
    <div>
        <h2>Outdoor Tables</h2>
        <div className='indoor-cont'>
            {
                outdoorTables && outdoorTables
                    .filter(x => x.table_type == 'outdoor')
                    .map((val, idx) => {
                        return (
                            <>
                                <div key={idx}>
                                    <DineInCards
                                        tableno={val.table_no}
                                        totcapacity={val.table_capacity}
                                        pploccupied={val.table_pploccupied}
                                        icon={val.table_icon}
                                        backgroundcolor={val.table_color}
                                        urlToPage={val.table_url}
                                        tabletaken={val.table_taken}
                                        itemsord={val.table_itemsordered}
                                    />
                                </div>
                            </>
                        )
                    })
            }
        </div>
    </div>
);

const DineinHomepage = () => {
    // Loading from the server
    const [data, setData] = useState([]);


    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/table_data');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://restogenius.onrender.com/get_saved_orders');
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);


    const [selectedDinning, setSelectedDinning] = useState('indoor');

    const handleSelect = (event) => {
        setSelectedDinning(event.target.value);
    };

    var totavl = 0;
    var fullyoccu = 0;
    var partiallyoccu = 0;
    var runningorder = 0;
    var completedorder = 0;

    useEffect(() => {
        // Fetch data when the component mounts
        fetchCompletedData();
        // const intervalId = setInterval(() => {
        //     fetchCompletedData();
        // }, 1000);

        // // Clean up the interval when the component is unmounted
        // return () => clearInterval(intervalId);
    }, []);

    const [completedOrder, setCompletedOrder] = useState([]);
    const fetchCompletedData = async () => {
        try {
            const response = await axios.get('https://restogenius.onrender.com/get_customer_details');
            console.log(response.data);
            setCompletedOrder(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getCompletedORder = async () => {

        const onlydate = completedOrder.filter(x => {
            if (x.type == "dinein") {
                const currentDate = new Date();
                const orderDate = new Date(x.date);

                const isOrderDateValid = orderDate.getDate() === currentDate.getDate() &&
                    orderDate.getMonth() === currentDate.getMonth() &&
                    orderDate.getFullYear() === currentDate.getFullYear();
                if (isOrderDateValid) {
                    return 1;
                }
                return 0;
            }

        });
        completedorder = onlydate.length;
    }


    function getpartailTable() {

        partiallyoccu = data.filter(x => x.table_pploccupied >= 1 && x.table_pploccupied != x.table_capacity).length;
    }

    function getfullyOccupied() {
        fullyoccu = data.filter(x => x.table_pploccupied == x.table_capacity).length

    }

    function getRunningORder() {
        runningorder = data.filter(x => x.table_taken === 'Yes').length
    }

    getpartailTable();
    getfullyOccupied();
    getRunningORder();
    getCompletedORder();

    totavl = data.length - Number(fullyoccu) - Number(partiallyoccu);


    return (
        <div>
            <h3 className='d-flex justify-content-center'>Dine In</h3>
        
            <div>
                <div className='dinein-navbar-cont'>

                    <select id="menu" className='ind-out-cont' onChange={handleSelect} value={selectedDinning}>
                        <option id="indoor" value="indoor">Indoor</option>
                        <option id="outdoor" value="outdoor">Outdoor</option>
                    </select>

                    <div className='info-cont'>
                        <a href="/#/running-order" className="running-order" style={{ 'color': '#000' }}>Running Order {runningorder}</a>


                        <a href="#" className="running-order" style={{ backgroundColor: "#FF7F7F", borderColor: "#FF7F7F", color: '#000' }}>Completed Order {completedorder}</a>
                        <p className="running-order" style={{ backgroundColor: "#009946", borderColor: "#009946", color: '#000' }}>Available {totavl}</p>
                        <p className="running-order" style={{ backgroundColor: "#FF0505", borderColor: "#FF0505", color: '#000' }}>Occupied {fullyoccu}</p>
                        <p className="running-order" style={{ backgroundColor: "#FF9D08", borderColor: "#FF9D08", color: '#000' }}>Partially Occupied {partiallyoccu}</p>
                    </div>

                </div>
                {selectedDinning === 'indoor' && <IndoorContent
                    indoorTables={data}
                    currentOrder={orders}
                />}
                {selectedDinning === 'outdoor' && <OutdoorContent
                    outdoorTables={data} />}


            </div>
        </div>
    );
}

export default DineinHomepage;
