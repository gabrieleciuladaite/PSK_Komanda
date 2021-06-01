import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import PopUp from "./PopUp";
import axios from "axios";

function StorageBlock() {
  const [storage, setStorage] = useState([]);

  const [link, setLink] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const newLink = useRef("");

  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
  });

  function handleLink(item) {
    if (item.categories[0] != null) {
      if (item.categories[0].category.name === "bouquet")
      {
        newLink.current ="/bouquet/";
        console.log("this is bouquet");
        console.log(newLink);
      }
      else if (item.categories[0].category.name === "flower") {
        newLink.current = "/flower/";
        console.log("this is flower");
        console.log(link);
      }
      else newLink.current = "";
    }
  }

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getStorage = async () => {
      let data = await api.get("/ItemBundle").then(({ data }) => data);
      console.log(data);
      setStorage(data);
    };
    getStorage();
  }, []);

  const useSortableData = (storage, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...storage];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [storage, sortConfig]);

    const requestSort = (key) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    return { storage: sortedItems, requestSort, sortConfig };
  };

  const ProductTable = (props) => {
    const { storage, requestSort, sortConfig } = useSortableData(
      props.products
    );
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
                onClick={() => requestSort("photo")}
                className={getClassNamesFor("photo")}
              >
                Picture
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("title")}
                className={getClassNamesFor("title")}
              >
                Product Name
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("price")}
                className={getClassNamesFor("price")}
              >
                Unit Price
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("stock")}
                className={getClassNamesFor("stock")}
              >
                Quantity
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("description")}
                className={getClassNamesFor("description")}
              >
                Description
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {storage.map((flower, i) => (
            <tr key={i}>
              <td>
                <img src={flower.photo} alt=""/>
                <br/>
                <Link
                  onClick={handleLink(flower)}
                  className="andro_btn-custom primary"
                  to={`${newLink.current}${flower.itemBundleId}`}
                >
                  Edit
                </Link>
              </td>
              <td>{flower.title}</td>
              <td>{flower.price/100}€</td>
              <td>{flower.items.length > 1? "": flower.stock}</td>
              <td>{flower.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="section">
      <div className="container">
        {/* Storage Start */}
        <h4>Storage</h4>
        <ProductTable products={storage}></ProductTable>
        <input
          type="button"
          value="Add new item"
          className="andro_btn-custom primary"
          onClick={togglePopUp}
        />
        {/* Storage End */}
      </div>
      {isOpen && (
        <PopUp
          content={
            <>
              <b>Choose what you want to add to storage</b>
              <br />
              <Link to="/newflower" className="andro_btn-custom primary">
                Flower
              </Link>
              <Link to="/newbouquet" className="andro_btn-custom primary">
                Bouquet
              </Link>
            </>
          }
          handleClose={togglePopUp}
        />
      )}
    </div>
  );
}

export default StorageBlock;
