import React, { Component } from "react";

class FlowerBlock extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          {/* Storage Start */}
          <h4>Edit flower</h4>
          <table className="andro_responsive-table">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <td data-title="Picture">
                <div className="andro_cart-product-wrapper">
                  <img src="" alt="" />
                </div>
                <button type="button">Upload</button>
              </td>
              <td data-title="Product Name">
                  <input></input>
              </td>
              <td data-title="Unit Price">
                  <input>
                  </input>
              </td>
              <td data-title="Quantity">
                  <button>-</button>
                  <span>0</span>
                  <button>+</button>
              </td>
            </tbody>
          </table>
          <h6>Description</h6>
          <input></input>
          <br></br>
          <br></br>
          <button type="button" className="andro_btn-custom primary">
            Remove
          </button>
          <button type="button" className="andro_btn-custom primary">
            Save
          </button>
          {/* Storage End */}
        </div>
      </div>
    );
  }
}

export default FlowerBlock;
