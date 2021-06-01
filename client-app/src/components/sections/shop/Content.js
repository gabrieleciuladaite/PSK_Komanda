import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import shopbox from '../../../data/shop.json';
import Loader from '../../layouts/Loader';
import classNames from 'classnames';
import categories from '../../../data/categories.json';
import axios from 'axios';




export default function Content() {


    const [itemBundle, setBundleItems] = useState([]);
    const [renderItems, setRenderItems] = useState([]);

    useEffect(() => {
        fetchItemBundles();
    }, []);


    const fetchItemBundles = async () => {
        const response = await axios.get('http://134.209.227.30:5000/api/ItemBundle');
        setBundleItems(response.data);
        setRenderItems(response.data);
    }

    console.log(itemBundle);




    const itemsComponent = renderItems.map((item) => {
        return <div key={item.itemBundleId} className="col-md-4 col-sm-6 masonry-item">
        <div className="andro_product andro_product-has-controls">
            <div className="andro_product-thumb">
                <Link to={"/product-single/" + item.itemBundleId}>
                    <img src={item.photo} alt={item.title} />
                </Link>
            </div>
            <div className="andro_product-body">
                <h5 className="andro_product-title"><Link to={"/product-single/" + item.itemBundleId}> {item.title} </Link> </h5>
                <div className="andro_product-price">
                    <span>{item.price / 100}€</span>
                </div>
                <p>{item.description}</p>
            </div>
        </div>
    </div>
    });



    const handleClickFlowers = () => 
    {
        const flowersMatch = itemBundle.filter(item => {return item.items.length <= 1});
        setRenderItems(flowersMatch);
    }

    const handleClickBouquets = () => 
    {
        const bouquetsMatch = itemBundle.filter(item => {return item.items.length > 1});
        setRenderItems(bouquetsMatch);
    }

    const handleClickAll = () => {
        const allMatch = itemBundle;
        setRenderItems(allMatch);
    }



    return (
        <div className="section">
            {/* Sidebar Start */}
            <div className="container">
                <div className="">
                    {/* Filter: Categories Start */}
                    <div className="">
                        <h5 className="widget-title"> Filter your categories: </h5>
                        <ul className="sidebar-widget-list">
                            <li >
                                <div className="custom-control custom-checkbox">
                                    <input type="radio" name='flower-type' className="custom-control-input" id={"all"} onClick={handleClickAll}/>
                                    <label className="custom-control-label" htmlFor={"all"}>All</label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-checkbox">
                                    <input type="radio" name='flower-type' className="custom-control-input" id={"flowers"} onClick={handleClickFlowers} />
                                    <label className="custom-control-label" htmlFor={"flowers"}>Flowers </label>
                                </div>
                            </li>
                            <li >
                                <div className="custom-control custom-checkbox">
                                    <input type="radio" name='flower-type' className="custom-control-input" id={"bouquets"} onClick={handleClickBouquets}/>
                                    <label className="custom-control-label" htmlFor={"bouquets"}>Bouquets</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Sidebar End */}
            <div className="container">
                <div className="row justify-content-center">
                    {itemsComponent}
                </div>
            </div>
        </div>
    );
}
