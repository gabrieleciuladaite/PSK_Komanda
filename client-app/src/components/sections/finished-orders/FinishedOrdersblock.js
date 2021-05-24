import React, { Component } from 'react';
import orders from '../../../data/finishedOrders.json';

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
                onClick={() => requestSort('orderNr')}
                className={getClassNamesFor('orderNr')}
              >
                Order Nr.
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('products')}
                className={getClassNamesFor('products')}
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
                Total
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('orderDate')}
                className={getClassNamesFor('orderDate')}
              >
                Order Date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, i) => (
            <tr key={i}>
                <td>{item.orderNr}</td>
                <td>{item.products.join(', ')}</td>
                <td>{item.qty.join(', ')}</td>
                <td>{item.total}</td>
                <td>{item.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


class FinishedOrdersblock extends Component {

    render() {
        return (
            <div className="section">
                <div className="container">
                    {/* Finished Orders Start */}
                    <h4>Finished Orders</h4>
                    <ProductTable products={orders}></ProductTable>
                    {/* Finished Orders End */}
                </div>
            </div>
        );
    }
}

export default FinishedOrdersblock;