import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../../data/cart.json';
import cards from '../../../data/cards.json';

const priceTotal = cart.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            value: 1,
            path: "/assets/img/cards/birthday.png"
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    // Modal
    modalShow() {
        this.setState({ modalshow: true });
    }
    modalClose() {
        this.setState({ modalshow: false });
    }


    handleChange(event) {
        this.setState({value: event.target.value})
        
       // console.log(this.state);
    }




    render() {
        const card = cards.find(card => card.id == this.state.value);
        const {path} = card;
        //console.log(path);
        return (
            <Fragment>
                <div className="section">
                    <div className="container">
                        {/* Cart Table Start */}
                        <table className="andro_responsive-table">
                            <thead>
                                <tr>
                                    <th className="remove-item" />
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, i) => (
                                    <tr key={i}>
                                        <td className="remove">
                                            <button type="button" className="close-btn close-danger remove-from-cart">
                                                <span />
                                                <span />
                                            </button>
                                        </td>
                                        <td data-title="Product">
                                            <div className="andro_cart-product-wrapper">
                                                <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                                                <div className="andro_cart-product-body">
                                                    <h6> <Link to="#">{item.title}</Link> </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-title="Price"> <strong>{new Intl.NumberFormat().format((item.price).toFixed(2))}$</strong> </td>
                                        <td className="quantity" data-title="Quantity">
                                            <input type="number" className="qty form-control" defaultValue={item.qty} />
                                        </td>
                                        <td data-title="Total"> <strong>{new Intl.NumberFormat().format((item.qty * item.price).toFixed(2))}$</strong> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Cart Table End */}
                    </div>
                </div>
                <div className="section pt-0">
                    <div className="container">
                        <form method="post">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h4 className="title">Add a greeting card?</h4>
                                </div>
                                <div className="form-group col-xl-12 mb-0">
                                    <label>Card type:</label>
                                    <select name="card" className="form-control" value={this.state.value} onChange={this.handleChange} >
                                        {cards.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <br />
                                    <br />
                                    <div className="text-center">
                                        <img className="img-thumbnail " src={process.env.PUBLIC_URL + path} />
                                    </div>
                                    <br />
                                    <br />
                                </div>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>From: </label>
                                        <input type="text" placeholder="From..." name="from_name" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>To: </label>
                                        <input type="text" placeholder="To..." name="to_name" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-12 mb-0">
                                        <label>Greeting message:</label>
                                        <textarea name="name" rows={5} className="form-control" placeholder="Type your best wishes here..." required />
                                    </div>
                                </div>
                                <br />
                                <button type="submit" className="andro_btn-custom primary btn-block">Add a card to the cart!</button>
                            </div>
                            <br />
                        </form>
                    </div>
                    <div className="container">
                        <div className="row andro_cart-form">
                            <div className="col-lg-12">
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
                                <br />
                                <Link to="/checkout" className="andro_btn-custom primary btn-block" >Proceeed to Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Content;