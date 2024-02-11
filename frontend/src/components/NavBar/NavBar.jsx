import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css"
import img1 from "../../assets/restlogo.png";

const NavBar = () => {
    const [HamShow, setHamShow] = useState(false);

    useEffect(() => {


    }, []);


    return (
        <>
            <section className="navbar-bg sticky-top navbar-light bg-light NavBarSection">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container">
                        <Link to="/">
                            <i>
                                <img
                                    src={img1}
                                    alt="company-logo"
                                    height="65px"
                                    className="navbar-brand"
                                />
                            </i>
                        </Link>
                        <button
                            className="navbar-toggler "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => {
                                setHamShow(!HamShow);
                            }}
                        >
                            <i className="hamburger">
                                <FontAwesomeIcon icon={faBars} />
                            </i>
                        </button>
                        <div
                            className={`collapse navbar-collapse ${HamShow ? "show" : ""}   `}
                        >
                            <ul className="navbar-nav ms-5 mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        exact="true"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        // activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/workss"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        How it works?
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/aboutus"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        Aboutus
                                    </NavLink>
                                </li>


                                <li className="nav-item">
                                    <NavLink
                                        to="/Contactus"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        activeClassName="active"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        ContactUs
                                    </NavLink>
                                </li>
                            </ul>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <NavLink
                                        to="/profile"
                                        exact="true"
                                        className="nav-link pe-4 text-light"
                                        aria-current="page"
                                        onClick={() => {
                                            setHamShow(!HamShow);
                                        }}
                                    >
                                        User Profile
                                    </NavLink>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </section>
        </>
    );
};

export default NavBar;
