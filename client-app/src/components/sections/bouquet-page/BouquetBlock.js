import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import PopUp from "../storage/PopUp";

function BouquetBlock()
{
  const [product, setProduct] = useState([]);
  const [items, setItems] = useState([]);
  const [isChoose, setIsChoose] = useState(false);
  const { productId } = useParams();
  const toggleChoose = () => {
    setIsChoose(!isChoose);
  };
  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });

  useEffect(() => {
    const getProduct = async () => {
      let data = await api
        .get("/ItemBundle/" + productId)
        .then(({ data }) => data);
      console.log("------------GET REQUEST------------");
      setProduct(data);
      console.log(product);
      console.log(data.optimistiC_LOCK_VERSION);
      console.log("----------------------------------");
    };
    const getItems = async () => {
      let data = await api
        .get("/Item")
        .then(({ data }) => data);
      console.log("------------GET REQUEST------------");
      setItems(data);
      console.log(items);
      console.log("----------------------------------");
    };
    getProduct();
    getItems();
    
  }, []);
  async function deleteProduct() {
    await api
      .delete(`/ItemBundle/${productId}`, {
        _method: "DELETE",
      })
      .then((response) => {
        toast.success("Item is deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured");
      });
    }

      async function updateProduct() {
        await api
          .put(`/ItemBundle/${productId}`, product, {
            _method: "PUT",
          })
          .then((response) => {
              toast.success("Item is updated successfully");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error occured");
          });
      }
      function handleChange(e) {
        //if(e.target.name==="price") e.target.value = e.target.valueAsNumber*100;
        if (e.target.name === "stock") {
          console.log(e.target.value.type);
          console.log(e.target.value);
          e.target.value = parseInt(e.target.value);
          console.log(e.target.value.type);
        }
        setProduct((prevProduct) => ({
          ...prevProduct,
          [e.target.name]: e.target.value,
        }));
      }

    return (
      <div className="section">
        <ToastContainer position="bottom-right" />
        <div className="container">
          {/* Storage Start */}
          <h4>Edit bouquet {product.title}</h4>
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
                <button className="andro_btn-custom primary"
                onClick={toggleChoose} type="button">Upload</button>
              </td>
              <td data-title="Product Name">
                  <input name="title" value={product.title} onChange={handleChange}></input>
              </td>
              <td data-title="Unit Price">
                  <input name="price" onChange={handleChange} value={product.price}>
                  </input>
              </td>
              <td data-title="Type of products">
                  <select>
                  {items.map((item)=>(
                        <option key={item.itemId}>{item.name}</option>
                      ))}
                  </select>
                  <br/>
                  <input type="number"></input>
                    <button>Add</button>
                    <br/>
                    
              </td>
            </tbody>
          </table>
          <h6>Description</h6>
          <input value={product.description}></input>
          <br></br>
          <br></br>
          <button
          type="button"
          onClick={deleteProduct}
          className="andro_btn-custom primary"
        >
          Remove
        </button>
        <button
          type="button"
          onClick={updateProduct}
          className="andro_btn-custom primary"
        >
          Save
        </button>
          {/* Storage End */}
        </div>
        {isChoose && (
        <PopUp
          content={
            <>
              <b>Upload your photo</b> <br />
              <br />
              <input
                type="text"
                name="photo"
                placeholder="type url"
                onChange={handleChange}
              ></input>
              <br />
              <br />
              <button
                className="andro_btn-custom primary"
                onClick={toggleChoose}
              >
                Upload
              </button>
            </>
          }
          handleClose={toggleChoose}
        />
      )}
      </div>
    );
}

export default BouquetBlock;
