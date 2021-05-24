import React, { Component, useState, useForm, useCallback } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../../../data/checkout.json';
import { Accordion, NavLink } from 'react-bootstrap';
import NotRegisteredModal from '../../layouts/NotRegisteredModal';

const priceTotal = checkout.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);


//rename this to class to a functional component
export default function Content() {

    const userData = localStorage.getItem('registeredUser');

    let user = {
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

    const [inputs,setInputs] = useState({
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
    });

    console.log()

    const onChangeHandler = useCallback(
      ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [])
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
    }



    //use this: https://www.youtube.com/watch?v=jHQC2NY0A-k
    
    
        
        


        







    





        return (
            <div className="section">
                <NotRegisteredModal />

                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-7">
                                {/* Buyer Info Start */}
                                <h4>Billing Details</h4>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>First Name <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="First Name" name="firstName" value={user.firstName} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Last Name <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Last Name" name="surName" value={user.surName} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Email Address <span className="text-danger">*</span></label>
                                        <input type="email" placeholder="Email Address" name="email" value={user.email} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Street Address <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Street Address" name="street" value={user.street} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>House Number <span className="text-danger">*</span></label>
                                        <input type="Number" placeholder="Street Number" name="houseNumber" value={user.houseNumber} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Postal Code </label>
                                        <input type="text" placeholder="Postal code" name="postIndex" value={user.postIndex} onChange={onChangeHandler} className="form-control" />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Flat Number <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Flat code" name="flatNumber" value={user.flatNumber} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Town / City <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Town / City" name="city" value={user.city} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Phone Number <span className="text-danger">*</span></label>
                                        <input type="phone" placeholder="Phone Number" name="phoneNumber" value={user.phoneNumber} onChange={onChangeHandler} className="form-control" required />
                                    </div>
                                </div>
                                {/* Buyer Info End */}
                            </div>
                            <div className="col-xl-5 checkout-billing">
                                {/* Order Details Start */}
                                <table className="andro_responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {checkout.map((item, i) => (
                                            <tr key={i}>
                                                <td data-title="Product">
                                                    <div className="andro_cart-product-wrapper">
                                                        <div className="andro_cart-product-body">
                                                            <h6>{item.productname} </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title="Quantity">x{item.qty}</td>
                                                <td data-title="Total"> <strong>{item.qty * item.price}$</strong> </td>
                                            </tr>
                                        ))}
                                        <tr className="total">
                                            <td>
                                                <h6 className="mb-0">Grand Total</h6>
                                            </td>
                                            <td />
                                            <td> <strong>{priceTotal}$</strong> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="text" className="form-control" name="cardNumber" placeholder="Card Number" value={user.cardNumber} onChange={onChangeHandler} required />
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 form-group">
                                        <label>Expiry Date</label>
                                        <input type="text" className="form-control" name="expiry" placeholder="Expiry Date (MM/YY)" value={user.expiry} onChange={onChangeHandler} required />
                                    </div>
                                    <div className="col-xl-6 form-group">
                                        <label>CVV*</label>
                                        <input type="number" className="form-control" name="cvv" placeholder="CVV" value={user.cvv} onChange={onChangeHandler} required />
                                    </div>
                                </div>
                                <button type="submit" className="andro_btn-custom primary btn-block">Order</button>
                                {/* Order Details End */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
}