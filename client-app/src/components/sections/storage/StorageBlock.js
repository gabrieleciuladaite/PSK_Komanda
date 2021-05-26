import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import PopUp from "./PopUp";
import axios from "axios";

function StorageBlock() {
  const [storage, setStorage] = useState([]);

  const [link, setLink] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
  });

  function handleLink(item) {
    if (item.categories[0] != null) {
      if (item.categories[0].category.name === "flower") {
        setLink("/flower/");
        console.log(item);
      } else if (item.categories[0].category.name === "bouquet")
        setLink("/bouquet");
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
                onClick={() => requestSort("items.name")}
                className={getClassNamesFor("items.name")}
              >
                Types
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
          {storage.map((item, i) => (
            <tr key={i}>
              <td>
                <img src={item.photo} alt=""/>
                <br/>
                <Link
                  onLoad={handleLink(item)}
                  className="andro_btn-custom primary"
                  to={`${link}${item.itemBundleId}`}
                >
                  Edit
                </Link>
              </td>
              <td>{item.title}</td>
              <td>{item.price/100}€</td>
              <td>{item.stock}</td>
              <td>{item.items.name}</td>
              <td>{item.description}</td>
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
