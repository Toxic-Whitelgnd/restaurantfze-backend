import React from 'react';
import "./DineIncards.css";
import { motion } from "framer-motion"
import { NavLink } from 'react-router-dom';

const DineInCards = ({tableno,totcapacity,pploccupied,itemsord,icon,backgroundcolor,urlToPage,tabletaken}) => {

    var totcap = totcapacity - pploccupied;
    var availableColor ="#009946";
    var occupiedColor = "#FF0505";
    var partaillyColor = "#FF9D08";

    if(tabletaken === 'Yes'){
        backgroundcolor = partaillyColor;
        
    }

    if(totcapacity == pploccupied){
        backgroundcolor = occupiedColor;
    }

    return (

        <div>
            <NavLink to={`${urlToPage}`}>
                <motion.div className='item-prdt'
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                    <div className='box-pdt-11' style={{ background: `${backgroundcolor}` }}>
                        <span class="badge position-absolute translate-middle totalppl">{totcap}</span>
                        <h5 className='tb-no1'>Table {tableno}</h5>
                        <p className='ordered-items1'>Ordered {itemsord} items</p>
                    </div>
                </motion.div>
                </NavLink>
        </div>
    );
}

export default DineInCards;
