import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../../../data/checkout.json';
import cart from '../../../data/cart.json';
import { Accordion, NavLink } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const priceTotal = checkout.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    constructor(props) {
        super(props);
        //in the props isRegistered is removed, need to setup localStorage!
        //this.state = {isRegistered: props.isRegistered}

        //CHECK LOCAL STORAGE (after registering) THEN SET THE VALUES HERE:

        this.state = {
            firstName: '',
            surName: '',
            email: '',
            city: '',
            street: '',
            postIndex: '',
            houseNumber: '',
            flatNumber: '',
            phoneNumber: '',
            cardNumber: '',
            expiry: '',
            cvv: ''
        };


        //this.isRegistered = props.isRegistered;
        //console.log(this.state.isRegistered);

    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name);

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    notify = () => toast.success('Item added to cart!');


    render() {
        return (
            <>
                <div className="section">
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-xl-7">
                                    <h4>Personal Settings: </h4>
                                    <div className="row">
                                        <div className="form-group col-xl-6">
                                            <label>First Name <span className="text-danger">*</span></label>
                                            <input type="text" placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Last Name <span className="text-danger">*</span></label>
                                            <input type="text" placeholder="Last Name" name="surName" value={this.state.surName} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Username <span className="text-danger">*</span></label>
                                            <input type="text" placeholder="Last Name" name="username" value={this.state.username} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Password <span className="text-danger">*</span></label>
                                            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Email Address <span className="text-danger">*</span></label>
                                            <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Phone Number <span className="text-danger">*</span></label>
                                            <input type="phone" placeholder="Phone Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <h4 className="form-group col-xl-12">Address Settings: </h4>
                                        <div className="form-group col-xl-12">
                                            <label>Street Address <span className="text-danger">*</span></label>
                                            <input type="text" placeholder="Street Address" name="street" value={this.state.street} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>House Number <span className="text-danger">*</span></label>
                                            <input type="Number" placeholder="Street Number" name="houseNumber" value={this.state.houseNumber} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Flat Number </label>
                                            <input type="text" placeholder="Flat Number" name="flatNumber" value={this.state.flatNumber} onChange={this.handleInputChange} className="form-control" />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Postal Code <span className="text-danger">*</span></label>
                                            <input type="text" placeholder="Postal Code" name="postIndex" value={this.state.postIndex} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <div className="form-group col-xl-6">
                                            <label>Town / City <span className="text-danger">*</span></label>
                                            <input type="text" placeholder="Town / City" name="city" value={this.state.city} onChange={this.handleInputChange} className="form-control" required />
                                        </div>
                                        <button type="submit" className="andro_btn-custom primary btn-block">Update Changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="section">
                <ToastContainer position="bottom-right" />
                    <div className="container">
                        <h4>Order History:</h4>
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
                                            <button type="button" className="andro_btn-custom" onClick={this.notify}>
                                                Order again
                                            </button>
                                        </td>
                                        <td data-title="Product">
                                            <div className="andro_cart-product-wrapper">
                                                <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                                                <div className="andro_cart-product-body">
                                                    <h6> <Link to={`/product-single/${item.id}`}>{item.title}</Link> </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-title="Price"> <strong>{new Intl.NumberFormat().format((item.price).toFixed(2))}$</strong> </td>
                                        <td className="quantity" data-title="Quantity">
                                            {item.qty}
                                        </td>
                                        <td data-title="Total"> <strong>{new Intl.NumberFormat().format((item.qty * item.price).toFixed(2))}$</strong> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default Content;