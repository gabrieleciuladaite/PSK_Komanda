import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ctamasonary extends Component {
    render() {
        return (
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="andro_cta">
                                <img src={process.env.PUBLIC_URL + "/assets/img/cta/3.jpg"} alt="cta" />
                                <div className="andro_cta-content">
                                    <h4 className="text-white"> Check storage</h4>
                                    <Link to="/storage" className="andro_btn-custom btn-sm light">Storage</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="andro_cta">
                                <img src={process.env.PUBLIC_URL + "/assets/img/cta/4.jpg"} alt="cta" />
                                <div className="andro_cta-content">
                                    <h4 className="text-white">Check upcoming orders </h4>
                                    <Link to="/upcoming" className="andro_btn-custom btn-sm light">Upcoming orders</Link>
                                </div>
                            </div>
                            <div className="andro_cta">
                                <img src={process.env.PUBLIC_URL + "/assets/img/cta/5.jpg"} alt="cta" />
                                <div className="andro_cta-content">
                                    <h4 className="text-white"> Add new worker</h4>
                                    <Link to="/workers" className="andro_btn-custom btn-sm light">Workers</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ctamasonary;