import React from 'react';
import "./HomeCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils,faList,faSackDollar,faTruck,faUsers,
    faCircleDollarToSlot,faMoneyBillWave,faCashRegister,faWallet} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

const HomeCard = ({ name, icon, color, id ,urlToPage}) => {
    
    // For mapping the api icon to Fontawesome icon
    const iconMap = {
        faList,
        faUtensils,
        faSackDollar,
        faTruck,
        faUsers,
        faCircleDollarToSlot,
        faMoneyBillWave,
        faCashRegister,
        faWallet,
      };

      const selectedIcon = iconMap[icon] || faList;

    return (
        <div>
            <div class="ag-courses_item" key={id}>
                <NavLink to={`${urlToPage}`} className="nav-link pe-4 text-light ag-courses-item_link">
                                    
                    
                    <div class="ag-courses-item_bg" style={{backgroundColor:`${color}`}}></div>

                    <div class="ag-courses-item_title">
                       {name}
                    </div>

                    <div class="ag-courses-item_date-box" >
                        
                        <span class="ag-courses-item_date" style={{color:`${color}`}}>
                        <FontAwesomeIcon icon={selectedIcon} />
                        </span>
                    </div>
                    </NavLink>
            </div>
        </div>
    );
}

export default HomeCard;
