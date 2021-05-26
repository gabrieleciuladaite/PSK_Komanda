import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Content() {

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            "email": email,
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "street": street,
            "addressNumber": addressNumber,
            "apartmentNumber": apartmentNumber,
            "postalCode": postalCode,
            "city": city,
            "phoneNumber": phoneNumber
        }
        console.log(user);

        const registerRequest = axios({
            method: 'post',
            url: 'http://134.209.227.30:5000/api/User/register',
            data: user,

        }).then((response) => {
            console.log(typeof(response.data));
            localStorage.setItem('jwt',response.data.token);
            localStorage.setItem('account', JSON.stringify(response.data));

            //if salyga redirectinimui
            history.push('/shop');

        }).catch(err => {
            toast.error(err.message);
            return;
        })



    }

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');



    return (
        <div className="section ">
            <ToastContainer position={'bottom-right'}/>
            <div className="container ">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xl-7">
                            <h4>Create a new account!</h4>
                            <div className="row">
                                <div className="form-group col-xl-6">
                                    <label>Email Address <span className="text-danger">*</span></label>
                                    <input type="email" placeholder="Email Address" name="email" onChange={e => setEmail(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Username <span className="text-danger">*</span></label>
                                    <input type="text" placeholder="Last Name" name="username" onChange={e => setUsername(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Password <span className="text-danger">*</span></label>
                                    <input type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input type="text" placeholder="First Name" name="firstName" onChange={e => setFirstName(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input type="text" placeholder="Last Name" name="lastName" onChange={e => setLastName(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Street Address <span className="text-danger">*</span></label>
                                    <input type="text" placeholder="Street Address" name="street" onChange={e => setStreet(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Address Number <span className="text-danger">*</span></label>
                                    <input type="Number" placeholder="Address Number" name="addressNumber" onChange={e => setAddressNumber(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Apartment Number </label>
                                    <input type="text" placeholder="Apartment Number" name="apartamentNumber" onChange={e => setApartmentNumber(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Postal Code <span className="text-danger">*</span></label>
                                    <input type="text" placeholder="Postal Code" name="postalCode" onChange={e => setPostalCode(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Town / City <span className="text-danger">*</span></label>
                                    <input type="text" placeholder="Town / City" name="city" onChange={e => setCity(e.target.value)} className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>Phone Number <span className="text-danger">*</span></label>
                                    <input type="phone" placeholder="Phone Number" name="phoneNumber" onChange={e => setPhoneNumber(e.target.value)} className="form-control" required />
                                </div>
                                <button type="submit" className="andro_btn-custom primary btn-block">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}