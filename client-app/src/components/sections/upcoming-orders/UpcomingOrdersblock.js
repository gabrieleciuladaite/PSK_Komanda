import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://134.209.227.30:5000/api",
});

const useSortableData = (orders, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...orders];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [orders, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { orders: sortedItems, requestSort, sortConfig };
  };

  const ProductTable = (props) => {
    const { orders, requestSort, sortConfig } = useSortableData(props.products);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
    <table className="andro_responsive-table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('cartId')}
                className={getClassNamesFor('cartId')}
              >
                Order Nr.
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('items')}
                className={getClassNamesFor('items')}
              >
                Products
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('quantity')}
                className={getClassNamesFor('quantity')}
              >
                Quantity
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('total')}
                className={getClassNamesFor('total')}
              >
                Total (€)
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('date')}
                className={getClassNamesFor('date')}
              >
                Order Shipping Date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.cartId}>
              <td>{item.cartId}</td>
              <td>{item.items.itemBundle.title.join(" ,")}</td>
              <td>{item.items.quantity.join(" ,")}</td>
              <td>{item.items.reduce((sum, items) => sum = sum + items.itemBundle.price)}</td>
              <td>{item.delivery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

class UpcomingOrdersblock extends Component {
  state = {
    orders: [],
  };

  constructor() {
    super();
    this.getOrders();
  }

  getOrders = async () => {
    let data = await api.get("/Cart/shipped").then(({ data }) => data);
    this.setState({ orders: data });
    console.log(this.state.orders);
  };

  render() {
    return (
      <div className="section">
        <div className="container">
          {/* Upcoming Orders Start */}
          <h4>Upcoming Orders</h4>
          
          <ProductTable products={this.state.orders}></ProductTable>
          {/* Upcoming Orders End */}
        </div>
      </div>
    );
  }
}

export default UpcomingOrdersblock;
