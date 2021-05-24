import React, { Component, Fragment } from 'react';
//import checkout from '../../../data/checkout.json';
import StorageBlock from './StorageBlock';

//const priceTotal = checkout.reduce((totalPrice, item) => totalPrice + item.price * item.qty, 0);

class Content extends Component {
    render() {
        return (
            <Fragment>
                <StorageBlock />
            </Fragment>
        );
    }
}

export default Content;