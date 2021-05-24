import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Abouttext extends Component {
    render() {
        return (
                <div className="section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-lg-20 andro_single-img-wrapper">
                                <img src={process.env.PUBLIC_URL + "/assets/img/about2.png"} alt="about us" />
                            </div>
                            <div className="col-lg-6">
                                <div className="section-title-wrap mr-lg-30">
                                    <h2 className="title">Serving <span className="custom-primary">Fresh Flowers</span> Since 2021</h2>
                                    <p className="subtitle">This project has been done by "Komanda": Agata Gaben, Tomas Narevičius, Erika Klimovič, Gabrielė Čiuladaite, Aurimas Jurgelis</p>

                                    <Link to="/shop" className="andro_btn-custom">Feel free to browse or shop</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Abouttext;