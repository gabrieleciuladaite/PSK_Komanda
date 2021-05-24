import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/checkout/Content';

const pagelocation = 'Checkout'

class Checkout extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Checkout | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Content />
                <Footer footer={{ style:"andro_footer-dark", logo:"assets/img/logo.png" }} />
            </Fragment>
        );
    }
}

export default Checkout;