import React, { Component, Fragment } from 'react';
//import checkout from '../../../data/checkout.json';
import WorkerForm from './WorkerForm';
import WorkersData from './WorkersData';

//const priceTotal = checkout.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    render() {
        return (
            <Fragment>
                <WorkerForm />
                <WorkersData />
            </Fragment>
        );
    }
}

export default Content;