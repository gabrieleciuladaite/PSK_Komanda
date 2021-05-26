import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



export default function Content() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const isLoggedIn = localStorage.getItem('jwt') ? true : false;

    if (isLoggedIn) {
        history.push('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginRequest = axios({
            method: 'post',
            url: 'http://134.209.227.30:5000/api/User/login',
            data: {
                "email": email,
                "password": password
            }
        }).then((response) => {
            console.log(response.data);
            toast.success('Success');
            localStorage.setItem('jwt', response.data.token);
            localStorage.setItem('account', JSON.stringify(response.data));
            history.push('/');
        })
            .catch(err => {
                toast.error(err.message + ". Please try again or contact the creators!");
                return;
            })


    }



    return (
        <div className="section">
            <ToastContainer position="bottom-right" />
            <div className="container">
                <div className="andro_auth-wrapper">
                    <div className="andro_auth-description bg-cover bg-center dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/auth.jpg)" }}>
                        <div className="andro_auth-description-inner">
                            <i className="flaticon-diet" />
                            <h2>Welcome To The Flower Shop!</h2>
                        </div>
                    </div>
                    <div className="andro_auth-form">
                        <h2>Log in</h2>
                        <form onSubmit={e => { handleSubmit(e) }}>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="andro_btn-custom primary">Login</button>
                            <p>Don't have an account? <Link to="/register">Create One</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
