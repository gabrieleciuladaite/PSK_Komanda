import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/login/Content';

const pagelocation = 'Login'

class Login extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Login | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Content/>
                <Footer footer={{ style:"", logo:"assets/img/logo.png" }} />
            </Fragment>
        );
    }
}

export default Login;