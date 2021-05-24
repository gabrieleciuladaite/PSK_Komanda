import React, { Component, Fragment } from 'react';
import { Accordion, Card, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Info
const contactinfo = [
    {
        icon: "flaticon-call",
        title: "Call Center",
        para: "Call or message us at our call center by phone or whatsapp: +37012341234",
    },
    {
        icon: "flaticon-email",
        title: "Mail Us",
        para: "You can also contact us through email: kazkoks.email@gmail.com",
    },
    {
        icon: "flaticon-location",
        title: "Nearest Branch",
        para: "Or you can visit the nearest branch! Address: Naugarduko g. 24, Vilnius 03225",
    },
]

class Content extends Component {
    render() {
        return (
            <Fragment>
                {/* Icons Start */}
                <div className="section section-padding pt-0">
                    <div className="container">
                        <div className="row">
                            {contactinfo.map((item, i) => (
                                <div key={i} className="col-lg-4">
                                    <div className="andro_icon-block">
                                        <Link to="#">
                                            <i className={item.icon} />
                                            <h5>{item.title}</h5>
                                            <p>{item.para}</p>
                                        </Link>
                                        <svg xmlns="http://www.w3.org/2000/svg">
                                            <rect height={500} width={500} className="andro_svg-stroke-shape-anim" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Icons End */}
                <div className="section section-padding pt-0">
                    <div className="container">
                        <div className="andro_cta">
                            <img src={process.env.PUBLIC_URL + "/assets/img/cta/6.jpg"} alt="cta" />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Content;