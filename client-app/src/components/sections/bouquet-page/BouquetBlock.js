import { useState, useEffect, useRef } from "react";
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
  const [list, setList] = useState([]);
  const [flowerType, setFlower] = useState(null);
  const [quantit, setQuantit] = useState(null);
  const l = [];
  const price = useRef(0);
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
      price.current = data.price/100;
      setProduct(data);
    };
    const getItems = async () => {
      let data = await api
        .get("/Item")
        .then(({ data }) => data);
      setItems(data);
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
            console.log(product);
          });
      }

      function handleChange(e) {
        if(e.target.name === "flower") setFlower(e.target.value);
        else if(e.target.name === "quantity") setQuantit(e.target.value);
        else if(e.target.name==="price") 
        {
          price.current = e.target.valueAsNumber;
          let temp = e.target.valueAsNumber*100;
          console.log(temp);
          console.log(typeof(e.target.value));
          setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: temp}));
          console.log(product.price);
        }
        else if (e.target.name === "stock") {
          console.log(e.target.value.type);
          console.log(e.target.value);
          e.target.value = parseInt(e.target.value);
          console.log(e.target.value.type);
        }
        else
        {
          setProduct((prevProduct) => ({
          ...prevProduct,
          [e.target.name]: e.target.value,
        }));
        console.log("I did it");
        }
        console.log(product);
      }
  function addFlower()
  {
    let data;
    console.log(l);
    console.log(l.length);

    l[l.length] =  {
        item:
        {
          name: flowerType
        },
        quantity: quantit
    };

    console.log(l.length);

    console.log("List before");
    console.log(list);

    setList((prev)=>([
      ...prev,{ item:
      {
        name: flowerType
      },
      quantity: quantit
      }]
    ));

    console.log("List after");
    console.log(list);
    
    setProduct((prevProduct)=>({
      ...prevProduct, 
      items: list
      }));
      console.log(product);
  }
  function handleBlur(e)
  {
    if(e.target.value==null || e.target.value==="")
    setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: 0}));
  }

  function handleSelect(e)
  {
    setFlower(e.target.value);
  }

    return (
      <div className="section">
        <ToastContainer position="bottom-right" />
        <div className="container">
          {/* Storage Start */}
          <h4>Edit {product.title}</h4>
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
                  <input name="title" className="form-control" value={product.title} onChange={handleChange}></input>
              </td>
              <td data-title="Unit Price">
                  <input name="price" type="number" name ="price" min="0" step="0.01" className="form-control" onChange={handleChange} value={price.current}>
                  </input>
              </td>
              <td data-title="Type of products">
                  <select name = "flower" onChange={handleSelect} className="form-control">
                  {items.map((item)=>(
                        <option key={item.itemId}>{item.name}</option>
                      ))}
                  </select>
                  <br/>
                  <input name="quantity"  min="0" className="form-control" type="number"onChange={handleChange} onBlur={handleBlur}  value={quantit}></input>
                    <button onClick={addFlower} className="andro_btn-custom primary button-top">Add</button>
                    <br/>
                    <br/>
                    <ul>
            {product.items === undefined? "Nothing" : product.items.map((flower)=>
             <li>{flower.item.name} - {flower.quantity}</li>
             )}
          </ul>
              </td>
            </tbody>
          </table>
          <h6>Description</h6>
          <input className="form-control" value={product.description}></input>
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
          className="andro_btn-custom primary">
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
