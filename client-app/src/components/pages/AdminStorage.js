import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/AdminHeader';
import Footer from '../layouts/Footer';
import Content from '../sections/storage/Content';

const pagelocation = 'Administration'

class Account extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Storage | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Content/>
                <Footer footer={{ style:"andro_footer-dark", logo:"assets/img/logo.png" }} />
            </Fragment>
        );
    }
}

export default Account;