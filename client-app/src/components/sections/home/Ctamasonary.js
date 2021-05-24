import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ctamasonary extends Component {
    render() {
        return (
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="andro_cta">
                        <img src={process.env.PUBLIC_URL + "/assets/img/cta/4.jpg"} alt="cta" />
                        <div className="andro_cta-content">
                            <h4 className="text-white">Flowers and bonquets!</h4>
                            <Link to="/shop" className="andro_btn-custom btn-sm light">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ctamasonary;