import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import shopbox from '../../../data/shop.json';
import { OverlayTrigger, Tooltip, Tab, Nav } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

class Content extends Component {

    
    constructor(props) {
        super(props);
        console.log(this.props.productId);
        this.state = {
            clicks: 1
        };
    }
    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
    };

    DecreaseItem = () => {
        if (this.state.clicks < 1) {
            this.setState({
                clicks: 0,
            });
        } else {
            this.setState({
                clicks: this.state.clicks - 1,
            });
        }
    };


    handleChange(event) {
        this.setState({ clicks: event.target.value });
    }

    notify = () => toast.success('Item added to cart!');

    render() {
        return (
            <Fragment>
                {shopbox.filter(product => { return product.itemBundleId === parseInt(this.props.productId) }).map((item, i) => (
                    <Fragment key={i}>
                        {/* Product Content Start */}
                        <div className="section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="andro_product-single-thumb">
                                            <img src={process.env.PUBLIC_URL + "/" + item.photo} alt={item.title} />
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="andro_product-single-content">
                                            <h3> {item.title} </h3>
                                            <div className="andro_product-price">
                                                <span>{item.price}$</span>
                                            </div>
                                            <p className="andro_product-excerpt">{item.description}</p>
                                            <form className="andro_product-atc-form">
                                                <div className="qty-outter">
                                                    <button type="button" className="andro_btn-custom" onClick={this.notify}>Buy Now</button>
                                                    <ToastContainer position="bottom-right" />
                                                    <div className="qty">
                                                        <span className="qty-subtract" onClick={this.DecreaseItem} data-type="minus" data-field><i className="fa fa-minus" /></span>
                                                        <input type="text" name="clicks" value={this.state.clicks} onChange={this.handleChange.bind(this)} />
                                                        <span className="qty-add" onClick={this.IncrementItem} data-type="plus" data-field><i className="fa fa-plus" /></span>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}

export default Content;