import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/AdminHeader';
import Footer from '../layouts/Footer';
import Content from '../sections/upcoming-orders/Content';

const pagelocation = 'Administration';

class UpcomingOrders extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Upcoming Orders | {pagelocation}</title>
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

export default UpcomingOrders;