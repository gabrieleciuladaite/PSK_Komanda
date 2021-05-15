import React, { Component } from 'react';
import orders from '../../../data/finishedOrders.json';

class FinishedOrdersblock extends Component {

    render() {
        return (
            <div className="section">
                <div className="container">
                    {/* Finished Orders Start */}
                    <h4>Finished Orders</h4>
                    <table className="andro_responsive-table">
                        <thead>
                            <tr>
                                <th>Order Nr.</th>
                                <th>Products</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Order Shipping Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((item, i) => (
                                <tr key={i}>
                                    <td data-title="Order Nr.">{item.orderNr}</td>
                                    <td data-title="Products">{item.products.join(", ")}</td>
                                    <td data-title="Quantity">{item.qty.join(", ")}</td>
                                    <td data-title="Total">{item.total}</td>
                                    <td data-title="Order Shipping Date">{item.orderDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Finished Orders End */}
                </div>
            </div>
        );
    }
}

export default FinishedOrdersblock;