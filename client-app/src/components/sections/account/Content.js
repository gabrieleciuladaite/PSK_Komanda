import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../../../data/checkout.json';
import cart from '../../../data/cart.json';
import { Accordion, NavLink } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';


export default function Content() {

    const account = JSON.parse(localStorage.getItem('account'));

    console.log(account);

    let preloadedValues = {}
    if (account) {
        preloadedValues = {
            email: account.email,
            firstName: account.firstName,
            lastName: account.lastName,
            street: account.addresses[0].street,
            addressNumber: account.addresses[0].addressNumber,
            apartmentNumber: account.addresses[0].apartmentNumber,
            postCode: account.addresses[0].postCode,
            city: account.addresses[0].city,
            phoneNumber: account.phoneNumber
        }
    }

    const { register, handleSubmit } = useForm({
        defaultValues: preloadedValues,
    });


    const onSubmit = (data) => {
        console.log(data);

        //update localStorage
    }


    const accountinfo = [
        {
            title: "Personal Information",
            email: account.email,
            firstName: account.firstName,
            lastName: account.lastName,
            phoneNumber: account.phoneNumber
        },
        {
            title: "Address Information",
            street: account.addresses[0].street,
            addressNumber: account.addresses[0].addressNumber,
            apartmentNumber: account.addresses[0].apartmentNumber,
            postCode: account.addresses[0].postCode,
            city: account.addresses[0].city,
        },
    ]


    return (
        <>
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                                <div className="andro_icon-block">
                                        <h5>{accountinfo[0].title}</h5>
                                        <p>{"Email address: " + accountinfo[0].email}</p>
                                        <p>{"First name: " + accountinfo[0].firstName}</p>
                                        <p>{"Last name: " + accountinfo[0].lastName}</p>
                                        <p>{"Phone number: " + accountinfo[0].phoneNumber}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg">
                                        <rect height={500} width={500} className="andro_svg-stroke-shape-anim" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="andro_icon-block">
                                        <h5>{accountinfo[1].title}</h5>
                                        <p>{"Street address: " + accountinfo[1].street}</p>
                                        <p>{"Address number: " + accountinfo[1].addressNumber}</p>
                                        <p>{"Apartment number: " + accountinfo[1].apartmentNumber}</p>
                                        <p>{"Postal code: " + accountinfo[1].postCode}</p>
                                        <p>{"City: " + accountinfo[1].city}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg">
                                        <rect height={500} width={500} className="andro_svg-stroke-shape-anim" />
                                    </svg>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-xl-7">
                                <h4>Change Personal Information: </h4>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>Update your first name: <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="First Name" name="firstName" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Update your last name: <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Last Name" name="lastName" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Update your phone number: <span className="text-danger">*</span></label>
                                        <input type="number" placeholder="Phone number" name="phoneNumber" className="form-control" required />
                                    </div>
                                    <button type="submit" className="andro_btn-custom primary btn-block">Change your password</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-xl-7">
                                <h4>Change Password: </h4>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>Re-enter your email address: <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="First Name" name="email" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Enter your old password: <span className="text-danger">*</span></label>
                                        <input type="password" placeholder="Last Name" name="oldPassword" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Enter your new password: <span className="text-danger">*</span></label>
                                        <input type="password" placeholder="Last Name" name="newPassword" className="form-control" required />
                                    </div>
                                    <button type="submit" className="andro_btn-custom primary btn-block">Change your password</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-xl-7">
                                <div className="row">
                                    <h4 className="form-group col-xl-12">Change Address Settings: </h4>
                                    <div className="form-group col-xl-12">
                                        <label>Street Address <span className="text-danger">*</span></label>
                                        <input {...register('street', { required: true })} type="text" placeholder="Street Address" name="street" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Address Number <span className="text-danger">*</span></label>
                                        <input {...register('addressNumber', { required: true })} type="number" placeholder="Address Number" name="addressNumber" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Apartment Number </label>
                                        <input {...register('apartmentNumber', { required: true })} type="text" placeholder="Apartment Number" name="apartmentNumber" className="form-control" />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Postal Code <span className="text-danger">*</span></label>
                                        <input {...register('postCode', { required: true })} type="text" placeholder="Postal Code" name="postCode" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Town / City <span className="text-danger">*</span></label>
                                        <input {...register('city', { required: true })} type="text" placeholder="Town / City" name="city" className="form-control" required />
                                    </div>
                                    <button type="submit" className="andro_btn-custom primary btn-block">Update Address</button>
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
                                        <button type="button" id={item.itemBundleId} className="andro_btn-custom">
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