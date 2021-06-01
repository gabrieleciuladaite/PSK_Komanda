import { useState, useRef } from "react";
import axios from 'axios';
import PopUp from "../storage/PopUp";
import { ToastContainer, toast } from "react-toastify";

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
  const price = useRef(0);

  async function createProduct() {
    setProduct((prevProduct)=>({...prevProduct, 
      "price": prevProduct.price*100,
      "categories": [
      {
          "category":
          {
              "name": "flower"
          },
      }],
      "items":[{
        "item":
        {
          "name": prevProduct.name,
          "warehouseStock": prevProduct.stock
        },
        "quantity": 1
      }]}));

    let response = await api.post("/ItemBundle/", product);
    if(response.status===200) toast.success("Item is added successfully");
    console.log(response);
    setProduct([]);
  };

  function handleChange(e)
  {
    if(e.target.name ==="price") 
    {
      price.current = e.target.value;
      setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: e.target.value*100}));
    }
    else setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: e.target.value}));

    setProduct((prevProduct)=>({...prevProduct, 
      "categories": [
      {
          "category":
          {
              "name": "flower"
          },
      }],
      "items":[{
        "item":
        {
          "name": prevProduct.title,
          "warehouseStock": prevProduct.stock
        },
        "quantity": 1
      }]}));
  }

  function handleBlur(e)
  {
    if(e.target.value==null || e.target.value==="")
    setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: 0}));
  }
  console.log(product);
    return (
      <div className="section">
        <ToastContainer position="bottom-right" />
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
                <button type="button" className="andro_btn-custom primary" onClick={togglePopUp}>Upload</button>
              </td>
              <td data-title="Product Name">
                  <input type="text" name="title" className="form-control" onChange={handleChange} value={product.title}></input>
              </td>
              <td data-title="Unit Price">
                  <input type="number" name ="price" className="form-control" min="0" step="0.01" precision={2} onChange={handleChange} onBlur={handleBlur} value={price.current}>
                  </input>
              </td>
              <td data-title="Quantity">
                <input type="number" name="stock" className="form-control" min="0" onChange={handleChange} onBlur={handleBlur}  value={product.stock}></input>
              </td>
            </tbody>
          </table>
          <h6>Description</h6>
          <input type="text" name="description" className="form-control" onChange={handleChange} value={product.description}></input>
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
              <b>Upload your photo</b> <br />
              <br />
              <input
                type="text"
                name="photo"
                placeholder="type url"
                className="form-control"
                onChange={handleChange}
              ></input>
              <br />
              <br />
              <button
                className="andro_btn-custom primary"
                onClick={togglePopUp}
              >
                Upload
              </button>
            </>
          }
          handleClose={togglePopUp}
        />
      )}
      </div>
    );
}

export default NewFlowerBlock;
