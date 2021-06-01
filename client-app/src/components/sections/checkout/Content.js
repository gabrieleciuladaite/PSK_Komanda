import React, { Component, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../../../data/checkout.json';
import { Accordion, NavLink } from 'react-bootstrap';
import NotRegisteredModal from '../../layouts/NotRegisteredModal';
import OrderSuccessModal from '../../layouts/OrderSuccessModal';
import {useForm} from 'react-hook-form';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



//rename this to class to a functional component
export default function Content() {

    const account = JSON.parse(localStorage.getItem('account'));

    let preloadedValues = {}
    if(account)
    {
        preloadedValues = {
            email: account.email,
            firstName: account.firstName,
            lastName: account.lastName,
            street: account.addresses[0].street,
            addressNumber: account.addresses[0].addressNumber,
            apartmentNumber: account.addresses[0].apartmentNumber,
            postalCode: account.addresses[0].postCode,
            city: account.addresses[0].city,
            phoneNumber: account.phoneNumber
        }
    }



    const {register, handleSubmit} = useForm({
        defaultValues: preloadedValues,
    });

    const [orderModal, setOrderModal] = useState(false);



    const cart = JSON.parse(localStorage.getItem('cart'));
    const card = JSON.parse(localStorage.getItem('card'));

    let cardPrice = 0;
    let subTotal = 0;
    let shippingPrice = 499;
    let totalPrice = 0;
    cart.forEach(item => {
        subTotal += (item.price * item.quantity)
    });
    totalPrice += shippingPrice + subTotal;

    const onSubmit = (data) => {
        console.log(data);
        //console.log(card);
        //console.log(cart);


        console.log(cart.items)

        let cartToSent = {
            cartId: uuidv4(),
            items: [],
            card: {
                cardId: uuidv4(),
                design: {
                    name: card.name
                },
                message: card.message,
                from: card.from,
                to: card.to
            },
            shippingAddress: {
                street: data.street,
                apartmentNumber: data.apartmentNumber,
                addressNumber: data.addressNumber,
                city: data.city,
                postCode: data.postalCode,
            },
            receiver: {
                firstName: data.firstName,
                lastName: data.lastName
            }
        }

        cart.forEach(item => {
            cartToSent.items.push(item)
        });

        console.log(JSON.stringify(cartToSent));

        const cartRequest = axios({
            method: 'post',
            url: 'http://134.209.227.30:5000/api/Cart',
            data: cartToSent,
            headers: localStorage.getItem('jwt') ? {Authorization: `Bearer ${localStorage.getItem('jwt')}`} : '',
        }).then((response) => {
            console.log(response.data);


        }).catch(err => {
            toast.error(err.message);
            return;
        })




        setOrderModal(true);

    }





    return (
        <div className="section">
            {
                !localStorage.getItem('jwt') ?
                    <NotRegisteredModal /> : ''
            }
            {
                orderModal ?
                <OrderSuccessModal /> : ''
            }
            <ToastContainer position="bottom-right" />
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-xl-7">
                            {/* Buyer Info Start */}
                            <h4>Billing Details</h4>
                            <div className="row">
                                <div className="form-group col-xl-6">
                                    <label>Email Address <span className="text-danger">*</span></label>
                                    <input {...register('email', { required: true })} type="email" placeholder="Email Address" name="email" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input {...register('firstName', { required: true })} type="text" placeholder="First Name" name="firstName" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input {...register('lastName', { required: true })}  type="text" placeholder="Last Name" name="lastName" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Street Address <span className="text-danger">*</span></label>
                                    <input {...register('street', { required: true })}  type="text" placeholder="Street Address" name="street" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Address Number <span className="text-danger">*</span></label>
                                    <input {...register('addressNumber', { required: true })}  type="Number" placeholder="Address Number" name="addressNumber" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Apartment Number </label>
                                    <input {...register('apartmentNumber', { required: true })}  type="text" placeholder="Apartment number" name="apartmentNumber" className="form-control"  />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Postal Code <span className="text-danger">*</span></label>
                                    <input {...register('postalCode', { required: true })} type="text" placeholder="Postal code" name="postalCode" className="form-control" required/>
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Town / City <span className="text-danger">*</span></label>
                                    <input {...register('city', { required: true })}  type="text" placeholder="Town / City" name="city" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Phone Number <span className="text-danger">*</span></label>
                                    <input {...register('phoneNumber', { required: true })}  type="phone" placeholder="Phone Number" name="phoneNumber" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                <label>Delivery Time<span className="text-danger">*</span></label>
                                <DateTimePickerComponent {...register('deliveryTime', { required: true })} placeholder={"Choose date and time for delivery"} format="yyyy-MM-dd HH:mm" min={Date()} className="form-control" required/>
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
                                    {cart.map((item) => (
                                        <tr key={item.itemBundleId}>
                                            <td data-title="Product">
                                                <div className="andro_cart-product-wrapper">
                                                    <div className="andro_cart-product-body">
                                                        <h6>{item.title} </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-title="Quantity">{item.quantity}</td>
                                            <td data-title="Total"> <strong>{(item.quantity * item.price) / 100}€</strong> </td>
                                        </tr>
                                    ))}
                                    {card ?
                                        <tr key={card.id}>
                                            <td data-title="Product">
                                                <div className="andro_cart-product-wrapper">
                                                    <div className="andro_cart-product-body">
                                                        <h6>{card.name} </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-title="Quantity">{1}</td>
                                            <td data-title="Total"> <strong>{0.00}€</strong> </td>
                                        </tr> : ''}
                                    <tr className="total">
                                        <td>
                                            <h6 className="mb-0">Grand Total</h6>
                                        </td>
                                        <td> + Shipping: <strong>{shippingPrice / 100}€</strong></td>
                                        <td> <strong>{totalPrice / 100}€</strong> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" className="form-control" name="cardNumber" placeholder="Card Number"  />
                            </div>
                            <div className="row">
                                <div className="col-xl-6 form-group">
                                    <label>Expiry Date</label>
                                    <input type="text" className="form-control" name="expiry" placeholder="Expiry Date (MM/YY)"   />
                                </div>
                                <div className="col-xl-6 form-group">
                                    <label>CVV*</label>
                                    <input type="number" className="form-control" name="cvv" placeholder="CVV"  />
                                </div>
                            </div>
                            <button className="andro_btn-custom primary btn-block" onClick={handleSubmit}>Order</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}