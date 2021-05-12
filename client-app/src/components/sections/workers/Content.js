import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import checkout from '../../../data/checkout.json';
import { Accordion, NavLink } from 'react-bootstrap';
import WorkerForm from './WorkerForm';
import WorkersBlock from './WorkersBlock';

const priceTotal = checkout.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    render() {
        return (
            <Fragment>
                <WorkerForm />
                <WorkersBlock />
            </Fragment>
        );
    }
}

export default Content;