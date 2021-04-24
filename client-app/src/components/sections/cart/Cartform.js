import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../../data/cart.json';

const priceTotal = cart.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Cartform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    // Modal
    modalShow() {
        this.setState({ modalshow: true });
    }
    modalClose() {
        this.setState({ modalshow: false });
    }
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
        };
        return (
            <div className="section pt-0">
                <div className="container">
                    <div className="row andro_cart-form">
                        <div className="col-lg-6">
                            <div className="section-title">
                                <h4 className="title">Cart Total</h4>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>{new Intl.NumberFormat().format((priceTotal).toFixed(2))}$</td>
                                    </tr>
                                    <tr>
                                        <th>Tax</th>
                                        <td> 9.99$ <span className="small">(11%)</span> </td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td> <b>{new Intl.NumberFormat().format((priceTotal + 9.99).toFixed(2))}$</b> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className="andro_btn-custom primary btn-block">Proceeed to Checkout</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Cartform;