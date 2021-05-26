import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cards from '../../../data/cards.json';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


export default function Content() {

    const [card, setCard] = useState({
        value: "1",
        path: "/assets/img/cards/birthday.png"
    });


    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [wishes, setWishes] = useState('');
    const history = useHistory();


    let cart = JSON.parse(localStorage.getItem("cart"));
    if(!cart)
    {
        localStorage.setItem('cart',JSON.stringify([]));
    }

    let cardPrice = 0;
    let subTotal = 0;
    let shippingPrice = 499;
    let totalPrice = 0;
    if(cart)
    {
        cart.forEach(item => {
            subTotal += (item.price * item.quantity)
        });
    }



    totalPrice += shippingPrice + subTotal;

    const handleChange = (e) => {
        setCard({
            value: e.target.value,
            path: cards[e.target.value - 1].path
        });
        console.log(card);
    }

    const handleCardSubmit = (e) => {
        //checking we already have a card:
        e.preventDefault();

        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if(cartItems.length == 0) {
            toast.warning('Cart is empty, add some items first!');
            return;
        }

        const cardNotNull = localStorage.getItem('card') ? true : false;
        console.log("We have existing card: " + cardNotNull);

        if (cardNotNull) {
            toast.warning("Card is already added! Please remove it from the cart first!");
            return;
        }

        let submitCard = {
            "from": from,
            "to": to,
            "name": cards.find(item => item.id === card.value).name,
            "cardId": cards.find(item => item.id === card.value).id,
            "message": wishes,
            "price": cardPrice
        }
        localStorage.setItem('card', JSON.stringify(submitCard));
        //set default values to card (to refresh the screen)
        setCard({
            value: "1",
            path: "/assets/img/cards/birthday.png"
        });
    }

    const handleDeleteButton = (e) => {
        console.log(e.target.id);
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        console.log(cartItems);
        console.log(cartItems[0].itemBundleId)
        let index = cartItems.findIndex(item => item.itemBundleId == e.target.id);
        cartItems.splice(index, 1);
        console.log(cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        setCard({
            value: "1",
            path: "/assets/img/cards/birthday.png"
        });
    }

    const handleCardDeleteButton = (e) => {
        console.log('Deleting card from cart...');
        localStorage.removeItem('card');
        setCard({
            value: "1",
            path: "/assets/img/cards/birthday.png"
        });
    }

    useEffect(() => {
        cart = JSON.parse(localStorage.getItem("cart"));
    });

    const setItemQuantity = (e) => {
        //console.log(e.target.id);
        //console.log(e.target.value);

        let cartItems = JSON.parse(localStorage.getItem('cart'));
        let index = cartItems.findIndex(item => item.itemBundleId == e.target.id);
        cartItems[index].quantity = parseInt(e.target.value);
        localStorage.setItem('cart', JSON.stringify(cartItems));


    }

    const handleRefreshPage = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    const handleCheckoutButton = (e) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if (cartItems.length) {
            console.log('the cart is not empty');
            history.push('/checkout');
        } else {
            console.log('the cart is empty');
            toast.error('The cart is empty!');
        }
    }


    const savedCard = JSON.parse(localStorage.getItem('card'));


    return (
        <Fragment>
            <ToastContainer position={'bottom-right'} />
            <div className="section">
                <div className="container">
                    {cart.length ?
                        <>
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
                                                    <img src={item.img} alt={item.title} />
                                                    <div className="andro_cart-product-body">
                                                        <h6> {item.title} </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-title="Price"> <strong>{item.price / 100}€</strong> </td>
                                            <td className="quantity" data-title="Quantity">
                                                <input type="number" className="qty form-control" defaultValue={item.quantity} id={item.itemBundleId} onChange={e => setItemQuantity(e)} />
                                            </td>
                                            <td data-title="Total"> <strong>{(item.quantity * item.price) / 100}€</strong> </td>
                                        </tr>
                                    ))}
                                    {savedCard ? 
                                        <tr key={savedCard.id}>
                                            <td className="remove">
                                                <button type="button" id={savedCard.id} onClick={handleCardDeleteButton} className="close-btn close-danger remove-from-cart" >
                                                    <span />
                                                    <span />
                                                </button>
                                            </td>
                                            <td data-title="Product">
                                                <div className="andro_cart-product-wrapper">
                                                    {/* <img src={process.env.PUBLIC_URL + "/" + savedCard.path} alt={savedCard.name} /> */}
                                                    <div className="andro_cart-product-body">
                                                        <h6> {savedCard.name} </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-title="Price"> <strong>{0.00}€</strong> </td>
                                            <td className="quantity" data-title="Quantity">1</td>
                                            <td data-title="Total"> <strong>{0.00}€</strong> </td>
                                        </tr>
                                     : ''}
                                </tbody>
                            </table>
                            <button className="andro_btn-custom primary btn-block" onClick={handleRefreshPage}>Update</button>
                        </>
                         : <div className="section-title">
                             <h4 className="title">The cart is empty!</h4>
                         </div> }
                </div>
            </div>

            <div className="section pt-0">
                {!savedCard ?
                    <div className="container">
                        <form onSubmit={handleCardSubmit}>
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h4 className="title">Add a greeting card?</h4>
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
                    : ''}
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
                            <button onClick={handleCheckoutButton} className="andro_btn-custom primary btn-block" >Proceeed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
