import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import PopUp from "../storage/PopUp";

function BouquetBlock()
{
  const [product, setProduct] = useState([{}]);
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  const [flowerType, setFlower] = useState(null);
  const [quantit, setQuantit] = useState(null);
  const price = useRef(0);
  const l = [];

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };
  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });

  useEffect(() => {
  
    const getItems = async () => {
      let data = await api
        .get("/Item")
        .then(({ data }) => data);
      setItems(data);
    };
    getItems();
    
  }, []);


  async function createProduct() {
    console.log("final product");
    console.log(product);
    let response = await api.post("/ItemBundle/", product);
    console.log(product);
    if(response.status===200) toast.success("Item is added successfully");
    console.log(response);
  };

  function handleChange(e)
  {
    if(e.target.name ==="price") 
    {
      price.current = e.target.value;
      setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: e.target.value*100}));
    }
    setProduct((prevProduct)=>({
      ...prevProduct,
      categories:[{
        category:{
          name: "bouquet"
        }
      }]
    }))
    if(e.target.name === "flower") setFlower(e.target.value);
    else if(e.target.name === "quantity") setQuantit(e.target.value);
    else setProduct((prevProduct)=> ({...prevProduct, [e.target.name]: e.target.value}));
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
                <button type="button" className="andro_btn-custom primary" onClick={togglePopUp}>Upload</button>
              </td>
              <td data-title="Product Name">
                  <input type="text" name="title" className="form-control" onChange={handleChange}  value={product.title}></input>
              </td>
              <td data-title="Unit Price">
                  <input type="number" name ="price" min="0" step="0.01" className="form-control" precision={2} onChange={handleChange} onBlur={handleBlur} value={price.current}>
                  </input>
              </td>
              <td data-title="Type of products">
                  <select name = "flower" onChange={handleSelect} className="form-control">
                  {items.map((item)=>(
                        <option key={item.itemId}>{item.name}</option>
                      ))}
                  </select>
                  <br/>
                  <input type="number" name="quantity" min="0" className="form-control" onChange={handleChange} onBlur={handleBlur}  value={quantit}></input>
                  <button onClick={addFlower} className="andro_btn-custom primary button-top" >Add</button>
                    <br/>
                    <br/>
                    <br/>
                    <ul>
                   {product.items === undefined? "Nothing added" : product.items.map((flower, i)=>
             <li key={i}>{flower.item.name} - {flower.quantity}</li>
             )}
          </ul>
              </td>
            </tbody>
          </table>
          <h6>Description</h6>
          <input name="description" onChange={handleChange} className="form-control" value={product.description}></input>
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

export default BouquetBlock;
