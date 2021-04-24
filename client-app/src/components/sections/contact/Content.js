import React, { Component, Fragment } from 'react';
import { Accordion, Card, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Locations
const locationbox = [
    {
        photo: "assets/img/locations/1.jpg",
        title: "Find Us In",
        titlespan: "Greece",
        para: "Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.",
    },
    {
        photo: "assets/img/locations/2.jpg",
        title: "Find Us In",
        titlespan: "New York",
        para: "Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.",
    },
];
// Info
const contactinfo = [
    {
        icon: "flaticon-call",
        title: "Call Center",
        para: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        icon: "flaticon-email",
        title: "Mail Us",
        para: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        icon: "flaticon-location",
        title: "Nearest Branch",
        para: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
            </Fragment>
        );
    }
}

export default Content;