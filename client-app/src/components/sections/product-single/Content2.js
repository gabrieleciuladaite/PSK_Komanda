import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import shopbox from '../../../data/shop.json';
import { OverlayTrigger, Tooltip, Tab, Nav } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Content(props) {

    //console.log(props.productId);

    const [itemBundle, setBundleItems] = useState([]);

    let [clicks, setClicks] = useState(0);

    const handleMinusClick = () => {
        if (clicks < 1) {
            setClicks(0)
        } else {
            setClicks(clicks - 1);
        }
    }

    const handlePlusClick = () => {
        setClicks(clicks + 1);
    }

    useEffect(() => {
        fetchItemBundles();
    }, []);

    const fetchItemBundles = async () => {
        const response = await axios.get('http://134.209.227.30:5000/api/ItemBundle');
        setBundleItems(response.data);
    }

    const handleProductSubmit = (event) => {
        event.preventDefault();
        console.log(props.productId);

        if (clicks <= 0) {
            toast.error("Please set quantity at least one!");
            return;
        }



        if (localStorage.getItem('cart')) //checking if the cart is empty
        {
            //console.log('The cart is not empty!');
            let itemCart = JSON.parse(localStorage.getItem('cart'));
            //console.log(itemCart);

            let index = itemCart.findIndex(item => item.itemBundleId === (props.productId));
            //console.log("Found item at index: " + index);

            if(index != -1)
            {
                //console.log("Index found statement");
                itemCart[index].quantity += clicks;
                localStorage.setItem('cart',JSON.stringify(itemCart));
            } else {
                //console.log("Index NOT found statement");
                let itemFind = itemBundle.filter(item => { return item.itemBundleId === (props.productId) })[0];
                itemFind['quantity'] = clicks;
                itemCart.push(itemFind);
                localStorage.setItem('cart',JSON.stringify(itemCart));
            }
            
        } else {
            //console.log("The cart is empty!!");
            const itemCart = itemBundle.filter(item => { return item.itemBundleId === (props.productId) });
            //console.log('adding something...');
            itemCart[0]['quantity'] = clicks;
            //console.log(itemCart);
            localStorage.setItem("cart", JSON.stringify(itemCart));
        }




        notify();
    }

    const notify = () => toast.success('Item added to cart!');

    return (
        <Fragment>
            {itemBundle.filter(item => { return item.itemBundleId === (props.productId) }).map((item, i) => (
                <Fragment key={i}>
                    {/* Product Content Start */}
                    <div className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="andro_product-single-thumb">
                                        <img src={process.env.PUBLIC_URL + "/" + item.photo} alt={item.title} />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="andro_product-single-content">
                                        <h3> {item.title} </h3>
                                        <div className="andro_product-price">
                                            <span>{item.price / 100}€</span>
                                        </div>
                                        <p className="andro_product-excerpt">{item.description}</p>
                                        <form className="andro_product-atc-form" onSubmit={handleProductSubmit}>
                                            <div className="qty-outter">
                                                <button type="submit" className="andro_btn-custom">Buy Now</button>
                                                <ToastContainer position="bottom-right" />
                                                <div className="qty">
                                                    <span className="qty-subtract" onClick={handleMinusClick} data-type="minus" data-field><i className="fa fa-minus" /></span>
                                                    <input type="text" name="clicks" value={clicks} readOnly />
                                                    <span className="qty-add" onClick={handlePlusClick} odata-type="plus" data-field><i className="fa fa-plus" /></span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </Fragment>
    );
}