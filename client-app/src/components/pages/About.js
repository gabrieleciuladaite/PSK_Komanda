import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Content from '../sections/about/Content';

const pagelocation = 'About Us'

class About extends Component {
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

export default About;