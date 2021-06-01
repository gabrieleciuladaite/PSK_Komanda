import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PopUp from "../storage/PopUp";
import { ToastContainer, toast } from "react-toastify";

function FlowerBlock() {
  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isChoose, setIsChoose] = useState(false);
  const [locking, setLocking] = useState(0);
  const state = useRef(null);
  const price = useRef(0);
  const lockingState = useRef(0);

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };
  const toggleChoose = () => {
    setIsChoose(!isChoose);
  };
  const token = localStorage.getItem("jwt");
  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });

  const getProduct = async () => {
    let data = await api
      .get("/ItemBundle/" + productId)
      .then(({ data }) => data);
    console.log("------------GET REQUEST------------");
    lockingState.current = data.optimistiC_LOCK_VERSION;
    console.log("in GET");
    console.log(lockingState.current);
    if (!isOpen)
    {
      setProduct(data);
      price.current = data.price/100;
      state.current = data;
    } 
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(()=>{
    getProduct();
    console.log("Use effect");
    console.log(product);
    setProduct((prev)=> ({...prev, optimistiC_LOCK_VERSION: lockingState.current+1}));
    console.log("Use effect after");
    console.log(product);
  }, [locking])

  async function updateProduct() {
    state.current = product;
    await api
      .put(`/ItemBundle/${productId}`, product, {
        _method: "PUT",
      })
      .then((response) => {
        if (
          !response.data.isSuccess &&
          response.data.error.includes("OPTIMISTIC_LOCK_PROBLEM")
        )
          setIsOpen(true);
        else {
          toast.success("Item is updated successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured");
      });
    console.log(token);
  }

  async function afterLockTrue() {
    getProduct();
    console.log("in after optimistic lock");
    console.log(lockingState);

    let variable = lockingState.current+1;
    console.log(variable);
    setProduct((prev) => ({
        ...prev,
        optimistiC_LOCK_VERSION: variable
      }));
     state.current.optimistiC_LOCK_VERSION = lockingState.current+1;
     setLocking((previous) => previous + 1);
     //console.log(locking);
      console.log("---------------ALREADY AFTER MERGE LOCK----------");
      console.log(product);
      console.log(product.optimistiC_LOCK_VERSION);
      console.log("----------------------------------------------");
      
      await api
        .put(`/ItemBundle/${productId}`, state.current, {
          _method: "PUT",
        })
        .then((response) => {
          console.log(response.data.isSuccess);
          console.log(response.data);
          setIsOpen(false);
          toast.success("Item is updated successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error occured");
        });
    console.log(product);
    window.location.reload();
  }

  async function afterLockFalse() {
    setIsOpen(false);
    window.location.reload();
  }

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
    //this.getProduct();
  }

  function handleChange(e) {
    if(e.target.name==="price") 
    {
      price.current = e.target.valueAsNumber;
      e.target.value = e.target.value*100;
    }
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

  function handleBlur(e) {
    if (e.target.value == null || e.target.value === "")
      setProduct((prevProduct) => ({ ...prevProduct, [e.target.name]: 0 }));
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
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <td data-title="Picture">
              <div className="andro_cart-product-wrapper">
                <img src={product.photo} alt="" />
              </div>
              <button
                type="button"
                className="andro_btn-custom primary"
                onClick={toggleChoose}
              >
                Upload
              </button>
            </td>
            <td data-title="Product Name">
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={handleChange}
                value={product.title}
              ></input>
            </td>
            <td data-title="Unit Price">
              <input
                type="number"
                className="form-control"
                name="price"
                min="0"
                step="0.01"
                precision={2}
                onChange={handleChange}
                onBlur={handleBlur}
                value={price.current}
              ></input>
            </td>
            <td data-title="Quantity">
              <input
                type="number"
                className="form-control"
                name="stock"
                min="0"
                onChange={handleChange}
                onBlur={handleBlur}
                value={product.stock}
              ></input>
            </td>
          </tbody>
        </table>
        <h6>Description</h6>
        <input
          type="text"
          name="description"
          className="form-control"
          onChange={handleChange}
          value={product.description}
        ></input>
        <br></br>
        <br></br>
        
        <button
          type="button"
          onClick={updateProduct}
          className="andro_btn-custom primary between-buttons-right"
        >
          Save
        </button>

        <button
          type="button"
          onClick={deleteProduct}
          className="andro_btn-custom primary between-buttons"
        >
          Remove
        </button>
        {/* Storage End */}
      </div>
      {isOpen && (
        <PopUp
          content={
            <>
              <b>
                Someone made changes here too. Do you want to commit your
                changes?
              </b>{" "}
              <br />
              <br />
              <br />
              <br />
              <button
                className="andro_btn-custom primary"
                onClick={afterLockTrue}
              >
                Yes
              </button>
              <button
                className="andro_btn-custom primary"
                onClick={afterLockFalse}
              >
                No
              </button>
            </>
          }
          handleClose={togglePopUp}
        />
      )}

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
                className="form-control"
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

export default FlowerBlock;
