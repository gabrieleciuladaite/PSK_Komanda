import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../helper/Navigationhelper';
import AdminNavigation from './AdminNavigation';


class AdminHeader extends HeaderComponent {
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
                                <Link className="navbar-brand" to="/"> 
                                    <img src={process.env.PUBLIC_URL+"/assets/img/logo.png"} alt = "logo" /> 
                                </Link>
                                {/* Menu */}
                                <AdminNavigation />
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

export default AdminHeader;