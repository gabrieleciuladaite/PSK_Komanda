import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/AdminHeader';
import Content from '../sections/finished-orders/Content';

const pagelocation = 'Administration';

class FinishedOrders extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Finished Orders | {pagelocation}</title>
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

export default FinishedOrders;