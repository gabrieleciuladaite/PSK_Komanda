import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../../../data/checkout.json';
import { Accordion, NavLink } from 'react-bootstrap';
import UpcomingOrdersblock from './UpcomingOrdersblock';
import WorkerForm from './WorkerForm';

const priceTotal = checkout.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    render() {
        return (
            <Fragment>
                <WorkerForm />
                <UpcomingOrdersblock />
            </Fragment>
        );
    }
}

export default Content;