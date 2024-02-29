import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { IoHomeOutline } from "react-icons/io5";
import "./NavBar.css"
import img1 from "../../assets/restlogo.png";

const NavBar = () => {
    const [HamShow, setHamShow] = useState(false);

    useEffect(() => {


    }, []);


    return (
        <>
                <nav>
                        <Link to="/">
                            <IoHomeOutline 
                                style={{ fontSize: '20px' }}
                            />
                        </Link>
                </nav>
        </>
    );
};

export default NavBar;
