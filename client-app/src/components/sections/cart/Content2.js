import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import cards from '../../../data/cards.json';
import axios from 'axios';


export default function Content() {

    const [card, setCard] = useState({
        value: "1",
        path: "/assets/img/cards/birthday.png"
    });


    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [wishes, setWishes] = useState('');


    const cart = JSON.parse(localStorage.getItem("cart"));

    let cardPrice = 299;
    let subTotal = 0;
    let shippingPrice = 499;
    let totalPrice = 0;
    cart.forEach(item => {
        subTotal += (item.price * item.quantity)
    });


    totalPrice += shippingPrice + subTotal;

    const handleChange = (e) => {
        setCard({
            value: e.target.value,
            path: cards[e.target.value-1].path
        });
        console.log(card);
    }

    const handleCardSubmit = (e) => {
        e.preventDefault();
         let submitCard = {
             "from": from,
             "to": to,
             "name": cards.find(item => item.id === card.value).name,
             "cardId": cards.find(item => item.id === card.value).id,
             "message": wishes,
             "price": cardPrice
         }
        console.log(submitCard);
    }

    const handleDeleteButton = (e) => {
        console.log(e.target.id);
    }

    return (
        <Fragment>
            <div className="section">
                <div className="container">
                    <table className="andro_responsive-table">
                        <thead>
                            <tr>
                                <th className="remove-item" />
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.itemBundleId}>
                                    <td className="remove">
                                        <button type="button" id={item.itemBundleId} onClick={handleDeleteButton} className="close-btn close-danger remove-from-cart" >
                                            <span />
                                            <span />
                                        </button>
                                    </td>
                                    <td data-title="Product">
                                        <div className="andro_cart-product-wrapper">
                                            <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                                            <div className="andro_cart-product-body">
                                                <h6> {item.title} </h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title="Price"> <strong>{item.price / 100}€</strong> </td>
                                    <td className="quantity" data-title="Quantity">
                                        <input type="number" className="qty form-control" defaultValue={item.quantity} />
                                    </td>
                                    <td data-title="Total"> <strong>{(item.quantity * item.price) / 100}€</strong> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="section pt-0">
                <div className="container">
                    <form onSubmit={handleCardSubmit}>
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h4 className="title">Add a greeting card? (2.99€)</h4>
                            </div>
                            <div className="form-group col-xl-12 mb-0">
                                <label>Card type:</label>
                                <select name="card" className="form-control" value={card.value} onChange={handleChange} >
                                    {cards.map(item => (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <br />
                                <br />
                                <div className="text-center">
                                    <img className="img-thumbnail " src={process.env.PUBLIC_URL + card.path} />
                                </div>
                                <br />
                                <br />
                            </div>
                            <div className="row">
                                <div className="form-group col-xl-6">
                                    <label>From: </label>
                                    <input type="text" placeholder="From..." onChange={e => setFrom(e.target.value)} name="from_name" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label>To: </label>
                                    <input type="text" placeholder="To..." onChange={e => setTo(e.target.value)} name="to_name" className="form-control" required />
                                </div>
                                <div className="form-group col-xl-12 mb-0">
                                    <label>Greeting message:</label>
                                    <textarea name="text" rows={5} className="form-control" placeholder="Type your best wishes here..." onChange={e => setWishes(e.target.value)} required />
                                </div>
                            </div>
                            <br />
                            <button type="submit" className="andro_btn-custom primary btn-block">Add a card to the cart!</button>
                        </div>
                        <br />
                    </form>
                </div>
                <div className="container">
                    <div className="row andro_cart-form">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h4 className="title">Cart Total</h4>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>{subTotal / 100}€</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping </th>
                                        <td> 4.99€  </td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td> <b>{totalPrice / 100}€</b> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <Link to="/checkout" className="andro_btn-custom primary btn-block" >Proceeed to Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
