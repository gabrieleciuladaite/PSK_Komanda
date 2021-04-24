import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import HeaderComponent from '../../helper/Navigationhelper';
import Navigation from './Navigation';
import cartlist from '../../data/cart.json';

const priceTotal = cartlist.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Header extends HeaderComponent {
    render() {
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
                                    <li className="menu-item"><Link to="/login"> Login </Link></li>
                                    <li className="menu-item"><Link to="/account"> My Account </Link></li>
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
                                                <div className="andro_header-cart-content">
                                                <span>{cartlist.length} Items</span>
                                                    <span>{new Intl.NumberFormat().format((priceTotal).toFixed(2))}$</span>
                                                </div>
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
}

export default Header;