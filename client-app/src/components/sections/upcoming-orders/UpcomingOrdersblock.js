import React, { Component } from 'react';
import orders from '../../../data/upcomingOrders.json';

class UpcomingOrdersblock extends Component {
    
    deleteOrderFromUpcomming = (id) =>{
        let table = document.querySelector('tbody');
        table.deleteRow(id-1);
    };

    render() {
        return (
            <div className="section">
                <div className="container">
                    {/* Upcoming Orders Start */}
                    <h4>Upcoming Orders</h4>
                    <table className="andro_responsive-table">
                        <thead>
                            <tr>
                                <th>Order Nr.</th>
                                <th>Products</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Order Shipping Date</th>
                                <th>Status</th>
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
                                    <td data-title = "Status">
                                        <select onChange={()=> {this.deleteOrderFromUpcomming(i) }}>
                                            <option value = "Upcoming">Upcoming</option>
                                            <option value = "Finished">Finished</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Upcoming Orders End */}
                </div>
            </div>
        );
    }
}

export default UpcomingOrdersblock;