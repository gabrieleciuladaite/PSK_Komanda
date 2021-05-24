import React, { Component } from 'react';

const iconspost = [
    {
        icon: "flaticon-diet",
        title: "Guaranteed Fresh Flower",
        para: "Our flowers picked fresh straight from the finest florist farmers!",
    },
    {
        icon: "flaticon-harvest",
        title: "Hand Finished",
        para: "Premium hand finished flower bouquets guaranteed",
    },
    {
        icon: "flaticon-tag",
        title: "Cheap & Fresh",
        para: "We ensure the best prices in the whole country!",
    },
]

class Icons extends Component {
    render() {
        return (
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="row">
                        {iconspost.map((item, i) => (
                            <div key={i} className="col-lg-4">
                                <div className="andro_icon-block icon-block-2">
                                    <i className={item.icon} />
                                    <h5>{item.title}</h5>
                                    <p>{item.para}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Icons;