import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";

function BouquetBlock()
{
  const [product, setProduct] = useState([]);
  const [items, setItems] = useState([]);
  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });

  useEffect(() => {
  
    const getItems = async () => {
      let data = await api
        .get("/Item")
        .then(({ data }) => data);
      console.log("------------GET REQUEST------------");
      setItems(data);
      console.log(items);
      console.log("----------------------------------");
    };
    getItems();
    
  }, []);


  async function createProduct() {
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

    return (
      <div className="section">
        <ToastContainer position="bottom-right" />
        <div className="container">
          {/* Storage Start */}
          <h4>Add bouquet</h4>
          <table className="andro_responsive-table">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Product Name</th>
                <th>Unit Price (€)</th>
                <th>Type of Flowers</th>
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
                  <input type="text" name="title"  onChange={handleChange}  value={product.title}></input>
              </td>
              <td data-title="Unit Price">
                  <input type="number" name ="price" min="0" step="0.01" precision={2} onChange={handleChange} onBlur={handleBlur} value={product.price}>
                  </input>
              </td>
              <td data-title="Type of products">
                  <select>
                  {items.map((item)=>(
                        <option key={item.itemId}>{item.name}</option>
                      ))}
                  </select>
                  <br/>
                  <input type="number" name="quantity" min="0" onChange={handleChange} onBlur={handleBlur}  value={product.stock}></input>
                    <button>Add</button>
                    <br/>
                    <ul>
                
                    </ul>
              </td>
            </tbody>
          </table>
          <h6>Description</h6>
          <input value={product.description}></input>
          <br></br>
          <br></br>
          <button
          type="button"
          onClick={createProduct}
          className="andro_btn-custom primary"
        >
          Add new item
        </button>
          {/* Storage End */}
        </div>
      </div>
    );
}

export default BouquetBlock;
