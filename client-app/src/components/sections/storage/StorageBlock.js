import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import storage from '../../../data/storage.json';
import PopUp from "./PopUp";
import axios from "axios";

function StorageBlock() {
  const [storage, setStorage] = useState([]);

  const [link, setLink] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
  });

  function handleLink(category)
  {
    if(category==="flower") setLink("/flower/");
    else if(category==="bouquet") setLink("/bouquet/");
    else console.log("works");
  }
  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getStorage = async () => {
      let data = await api.get("/ItemBundle").then(({ data }) => data);
      setStorage(data);
    };
    getStorage();
  }, [api]);

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
                onClick={()=> requestSort("photo")}
                className={getClassNamesFor("photo")}
              >
                Picture
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={()=> requestSort("title")}
                className={getClassNamesFor("title")}
              >
                Product Name
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={()=> requestSort("price")}
                className={getClassNamesFor("price")}
              >
                Unit Price
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={()=> requestSort("stock")}
                className={getClassNamesFor("stock")}
              >
                Quantity
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={()=> requestSort("items.name")}
                className={getClassNamesFor("items.name")}
              >
                Types
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={()=> requestSort("description")}
                className={getClassNamesFor("description")}
              >
                Description
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {storage.map((item) => (
            <tr key={item.itemBundleId}>
              <td>
                {item.photo}
                <button onClick={console.log(item)}>
                  Edit
                </button>
              </td>
              <td>{item.title}</td>
              <td>{item.price}€</td>
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
              <Link to="/flower" className="andro_btn-custom primary">
                Flower
              </Link>
              <Link to="/bouquet" className="andro_btn-custom primary">
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
