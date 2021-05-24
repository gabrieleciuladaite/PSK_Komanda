import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import HeaderComponent from '../../helper/Navigationhelper';
import Navigation from './Navigation';
import cartlist from '../../data/cart.json';



export default function Header() {

    const handleLogOutClick = () => {
        console.log('Logging out...');
        localStorage.removeItem('jwt');
    }
    const isLoggedIn = localStorage.getItem('jwt') ? true : false;

    return (
        <Fragment>
            {/* Header Start */}
            <header className={`andro_header header-2`}>
                {/* Topheader Start */}
                <div className="andro_header-top">
                    <div className="container">
                        <div className="andro_header-top-inner">
                            <ul className="andro_header-top-sm andro_sm">
                            </ul>
                            <ul className="andro_header-top-links">
                                {!isLoggedIn ? <li className="menu-item"><Link to="/login" > Login </Link></li> : ''}
                                {isLoggedIn ? <li className="menu-item"><Link to="/account"> My Account </Link></li> : '' }
                                {isLoggedIn ? <li className="menu-item"><Link to="/login" onClick={handleLogOutClick}> Log out </Link></li> : ''}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Topheader End */}
                {/* Middle Header Start */}
                <div className="andro_header-middle">
                    <div className="container">
                        <nav className="navbar">
                            {/* Logo */}
                            <Link className="navbar-brand" to="/"> <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" /> </Link>
                            {/* Menu */}
                            <Navigation />
                            <div className="andro_header-controls">
                                <ul className="andro_header-controls-inner">
                                    <li className="andro_header-cart">
                                        <Link to="/cart" title="Your Cart">
                                            <i className="flaticon-shopping-basket" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* Middle Header End */}
            </header>
            {/* Header End */}
        </Fragment>
    );
}
