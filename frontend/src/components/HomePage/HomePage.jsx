import React, { useEffect, useState } from 'react';
import Homefeature from '../api/homepageapi';
import HomeCard from '../../cards/HomeCards/HomeCard';
import "./HomePage.css"
import axios from 'axios';


const HomePage = () => {

    const [hf, setHf] = useState(Homefeature);

    const [data, setData] = useState([]);
   

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
        
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://restaurantfze-prod.vercel.app/api/home_page_data');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    return (
        <div>
            <div className='home-card-cont justify-content-center'>
                {
                    data.length > 0 && data.map((val, idx) => {
                        return (
                            <>
                                <div key={idx}>
                                    <HomeCard
                                        name={val.home_name}
                                        icon={val.home_icon}
                                        id={val.home_id}
                                        urlToPage={val.home_url}
                                        color={val.home_color}
                                    />
                                </div>
                            </>
                        )
                    })
                }
                {
                    data.length === 0 && (
                       <h1>Connect to server</h1>
                    )
                }
            </div>

        </div>
    );
}

export default HomePage;
