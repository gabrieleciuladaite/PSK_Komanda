import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/product-single/Content';

const pagelocation = 'Product Single'

class Productsingle extends Component {
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
                <Content productId={this.props.match.params.id}/>
                <Footer footer={{ style:"", logo:"assets/img/logo.png" }} />
            </Fragment>
        );
    }
}

export default Productsingle;