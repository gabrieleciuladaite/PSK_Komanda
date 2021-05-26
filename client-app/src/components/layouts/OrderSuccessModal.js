import React, { Component, Link, useState } from 'react';
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

export default function NotRegisteredModal()
{


    const [show, setShow] = useState(true);
    const history = useHistory();

    const handleClose = () =>
    {
        setShow(false);
        history.push('/');
        localStorage.removeItem('cart');
        localStorage.removeItem('card');
    }

    const handleExit = () => {
        history.push('/');
        localStorage.removeItem('cart');
        localStorage.removeItem('card');
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
                        <h3>Thank you!</h3>
                        <p>Order has been successfully submitted. We will contact you shortly!</p>
                    </div>
                    <button className="andro_btn-custom" onClick={handleExit}>Close</button>
                </Modal.Body>
            </div>
        </Modal>
    );
}
