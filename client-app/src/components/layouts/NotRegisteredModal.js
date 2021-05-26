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
    }

    const handleRegister = () => {
        history.push('/register');
    }
    
    const handleLogin = () => {
        history.push('/login');
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
                        <h3>Hello!</h3>
                        <p>It seems that you have not registered yet, would you like to register or login?</p>
                    </div>
                    <button className="andro_btn-custom" onClick={handleLogin}>Login</button>
                    <br />
                    <button className="andro_btn-custom" onClick={handleRegister}>Register</button>
                    <br />
                    <button className="andro_btn-custom" onClick={handleClose}>No Thanks</button>
                </Modal.Body>
            </div>
        </Modal>
    );
}
//<Link to="/register" className="andro_btn-custom">Sure!</Link>
