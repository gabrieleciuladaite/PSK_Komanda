import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Content from '../sections/contact/Content';

const pagelocation = 'Contact Us'

class Contact extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Flower Shop | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <Content/>
            </Fragment>
        );
    }
}

export default Contact;