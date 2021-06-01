import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../../../data/checkout.json';
import cart from '../../../data/cart.json';
import { Accordion, NavLink } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';


export default function Content() {

    let account = JSON.parse(localStorage.getItem('account'));

    //console.log(account);

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




    //Update personal information
    const [updatedFirstName, setUpdatedFirstName] = useState('');
    const [updatedLastName, setUpdatedLastName] = useState('');
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');

    const handlePersonalUpdate = (e) => {
        e.preventDefault();
        let updatedInfo = {
            firstName: updatedFirstName,
            lastName: updatedLastName,
            phoneNumber: updatedPhoneNumber
        }
        console.log(updatedInfo)

        if (checkProperties(updatedInfo)) {
            console.log('Changes were found....');

            updatedInfo.firstName = updatedInfo.firstName !== '' ? updatedInfo.firstName : account.firstName;
            updatedInfo.lastName = updatedInfo.lastName !== '' ? updatedInfo.lastName : account.lastName;
            updatedInfo.phoneNumber = updatedInfo.phoneNumber !== '' ? updatedInfo.phoneNumber : account.phoneNumber;

            console.log(updatedInfo)

            const request = axios({
                method: 'put',
                url: 'http://134.209.227.30:5000/api/User',
                data: updatedInfo,
                headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
            }).then((response) => {
                console.log(response.data);
                toast.success('Your address has been updated!');
                //let temp = JSON.parse(localStorage.getItem('account'));
                //temp.addresses[0] = updatedAccountAddress;
                //localStorage.setItem('account', JSON.stringify(temp));
            }).catch(err => {
                toast.error(err.message);
                return;
            })


            // do smth
            

        } else {
            toast.error('There are no updated values found!');
            return;
        }

    }

    //handling Password change:
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();
        let passwordChangeInfo = {
            email: email,
            password: oldPassword,
            newPassword: newPassword
        }

        //console.log(passwordChangeInfo);

        const request = axios({
            method: 'put',
            url: 'http://134.209.227.30:5000/api/User/changepassword',
            data: passwordChangeInfo,

        }).then((response) => {
            localStorage.setItem('jwt', response.data.token);
            console.log(response.data);
            toast.success('Password has been changed!')

        }).catch(err => {
            toast.error(err.message);
            return;
        })

    }


    //handling address change:
    const [street, setStreet] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');

    console.log(account);

    const handleAddressChange = (e) => {
        e.preventDefault();
        let addressInfo = {
            street: street,
            addressNumber: addressNumber,
            apartmentNumber: apartmentNumber,
            postCode: postCode,
            city: city
        }

        if (checkProperties(addressInfo)) {
            let updatedAccountAddress = { ...account.addresses[0] }

            console.log(updatedAccountAddress);

            updatedAccountAddress.street = addressInfo.street !== '' ? addressInfo.street : updatedAccountAddress.street;
            updatedAccountAddress.addressNumber = addressInfo.addressNumber !== '' ? addressInfo.addressNumber : updatedAccountAddress.addressNumber;
            updatedAccountAddress.apartmentNumber = addressInfo.apartmentNumber !== '' ? addressInfo.apartmentNumber : updatedAccountAddress.apartmentNumber;
            updatedAccountAddress.postCode = addressInfo.postCode !== '' ? addressInfo.postCode : updatedAccountAddress.postCode;
            updatedAccountAddress.city = addressInfo.city !== '' ? addressInfo.city : updatedAccountAddress.city;


            console.log(updatedAccountAddress.addressId)
            console.log(account.addresses[0].addressId)



            const request = axios({
                method: 'put',
                url: `http://134.209.227.30:5000/api/Address/${updatedAccountAddress.addressId}`,
                data: updatedAccountAddress,
            }).then((response) => {
                console.log(response.data);
                toast.success('Your address has been updated!');
                let temp = JSON.parse(localStorage.getItem('account'));
                temp.addresses[0] = updatedAccountAddress;
                localStorage.setItem('account', JSON.stringify(temp));
            }).catch(err => {
                toast.error(err.message);
                return;
            })
            
        } else {
            toast.error('There are no updated values found!');
        }




    }


    function checkProperties(obj) {
        for (var key in obj) {
            if (obj[key] !== null && obj[key] != "")
                return true;
        }
        return false;
    }





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
                    <form onSubmit={handlePersonalUpdate}>
                        <div className="row">
                            <div className="col-xl-7">
                                <h4>Change Personal Information: </h4>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>Update your first name: </label>
                                        <input {...register('firstName')} type="text" placeholder="First Name" name="firstName" className="form-control" onChange={e => setUpdatedFirstName(e.target.value)} />
                                    </div>
                                    {/* <div className="form-group col-xl-6">
                                        <label>&nbsp;</label>
                                        <button type="submit" className="andro_btn-custom primary btn-block">Update</button>
                                    </div> */}
                                    <div className="form-group col-xl-6">
                                        <label>Update your last name: </label>
                                        <input {...register('lastName')} type="text" placeholder="Last Name" name="lastName" className="form-control" onChange={e => setUpdatedLastName(e.target.value)} />
                                    </div>
                                    {/* <div className="form-group col-xl-6">
                                        <label>&nbsp;</label>
                                        <button type="submit" className="andro_btn-custom primary btn-block">Update</button>
                                    </div> */}
                                    <div className="form-group col-xl-6">
                                        <label>Update your phone number: </label>
                                        <input {...register('phoneNumber')} type="number" placeholder="Phone number" name="phoneNumber" className="form-control" onChange={e => setUpdatedPhoneNumber(e.target.value)} />
                                    </div>
                                    {/* <div className="form-group col-xl-6">
                                        <label>&nbsp;</label>
                                        <button type="submit" className="andro_btn-custom primary btn-block">Update</button>
                                    </div> */}
                                    <button type="submit" className="andro_btn-custom primary btn-block">Submit changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <form onSubmit={handlePasswordChange}>
                        <div className="row">
                            <div className="col-xl-7">
                                <h4>Change Password: </h4>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>Re-enter your email address: <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Enter your old password: <span className="text-danger">*</span></label>
                                        <input type="password" placeholder="Old password" name="oldPassword" onChange={e => setOldPassword(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Enter your new password: <span className="text-danger">*</span></label>
                                        <input type="password" placeholder="New password" name="newPassword" onChange={e => setNewPassword(e.target.value)} className="form-control" required />
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
                    <form onSubmit={handleAddressChange}>
                        <div className="row">
                            <div className="col-xl-7">
                                <div className="row">
                                    <h4 className="form-group col-xl-12">Change Address Settings: </h4>
                                    <div className="form-group col-xl-12">
                                        <label>Street Address <span className="text-danger">*</span></label>
                                        <input {...register('street', { required: true })} onChange={e => setStreet(e.target.value)} type="text" placeholder="Street Address" name="street" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Address Number <span className="text-danger">*</span></label>
                                        <input {...register('addressNumber', { required: true })} onChange={e => setAddressNumber(e.target.value)} type="number" placeholder="Address Number" name="addressNumber" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Apartment Number </label>
                                        <input {...register('apartmentNumber')} onChange={e => setApartmentNumber(e.target.value)} type="text" placeholder="Apartment Number" name="apartmentNumber" className="form-control" />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Postal Code <span className="text-danger">*</span></label>
                                        <input {...register('postCode', { required: true })} onChange={e => setPostCode(e.target.value)} type="text" placeholder="Postal Code" name="postCode" className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Town / City <span className="text-danger">*</span></label>
                                        <input {...register('city', { required: true })} onChange={e => setCity(e.target.value)} type="text" placeholder="Town / City" name="city" className="form-control" required />
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