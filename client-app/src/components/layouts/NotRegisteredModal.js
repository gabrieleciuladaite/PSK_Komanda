import React, { Component, Link, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

export default function NotRegisteredModal()
{


    const [show, setShow] = useState(true); //sita reiksme keisk kei uzsiregino localStorage.getItem('registeredUser') != undefined ? false : true)
    const history = useHistory();

    const handleClose = () =>
    {
        setShow(false);
    }

    const handleSure = () => {
        localStorage.setItem('wentRegister','true');
        history.push('/register');
    }


    return (
        <Modal show={show} id="androNewsletterPopup" className="andro_newsletter-popup-modal" aria-labelledby="contained-modal-title-vcenter" onHide={handleClose} size="lg" centered>
            <div className="row">
                <Modal.Header className="col-lg-6">
                    <img src={process.env.PUBLIC_URL + "/assets/img/ig/3.jpg"} alt="newsletter" />
                    <div className="close-btn close newsletter-popup-trigger" onClick={handleClose}>
                        <span />
                        <span />
                    </div>
                </Modal.Header>
                <Modal.Body className="col-lg-6">
                    <div className="andro_newsletter-popup-text-wrapper">
                        <h3>Hi!</h3>
                        <p>It seems that you have not registered yet, would you like to register?</p>
                    </div>
                    <button type="submit" className="andro_btn-custom" onClick={handleSure}>Sure!</button>
                    <span className="newsletter-popup-trigger" onClick={handleClose}>No Thanks</span>
                </Modal.Body>
            </div>
        </Modal>
    );
}
//<Link to="/register" className="andro_btn-custom">Sure!</Link>
