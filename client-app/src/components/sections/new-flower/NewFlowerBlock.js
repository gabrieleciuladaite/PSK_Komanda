import { useState } from "react";
import axios from 'axios';
import PopUp from "../storage/PopUp";

function NewFlowerBlock() {
  const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };
  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
  });

  async function createProduct() {
    setProduct((prevProduct)=>({...prevProduct, "categories":{"category":{"categoryId": "f027eab0-2adf-4d51-9999-df95e374118f","name": "flower"}}}))
    let response = await api.post("/ItemBundle/", product);
    console.log(response);
  };

  function handleChange(e)
  {
    setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: e.target.value}))
  }

  function handleBlur(e)
  {
    if(e.target.value==null || e.target.value==="")
    setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: 0}));
  }
  console.log(product);
    return (
      <div className="section">
        <div className="container">
          {/* Storage Start */}
          <h4>Add new flower</h4>
          <table className="andro_responsive-table">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Product Name</th>
                <th>Unit Price (€)</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <td data-title="Picture">
                <div className="andro_cart-product-wrapper">
                  <img src={product.photo} alt="" />
                </div>
                <button type="button">Upload</button>
              </td>
              <td data-title="Product Name">
                  <input type="text" name="title" onChange={handleChange} value={product.title}></input>
              </td>
              <td data-title="Unit Price">
                  <input type="number" name ="price" min="0" step="0.01" precision={2} onChange={handleChange} onBlur={handleBlur} value={product.price}>
                  </input>
              </td>
              <td data-title="Quantity">
                <input type="number" name="stock" min="0" onChange={handleChange} onBlur={handleBlur}  value={product.stock}></input>
              </td>
            </tbody>
          </table>
          <h6>Description</h6>
          <input type="text" name="description" onChange={handleChange} value={product.description}></input>
          <br></br>
          <br></br>
          <button type="button" onClick={createProduct} className="andro_btn-custom primary">
            Add new item
          </button>
          {/* Storage End */}
        </div>
        {isOpen && (
        <PopUp
          content={
            <>
              <b>Other user made changes here. Do you want to save your changes?</b>
              <button className="andro_btn-custom primary">Yes</button>
              <button className="andro_btn-custom primary">No</button>
            </>
          }
          handleClose={togglePopUp}
        />
      )}
      </div>
    );
}

export default NewFlowerBlock;
