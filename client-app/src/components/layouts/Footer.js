import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Footer extends Component {
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    render() {
        return (
            <footer className={"andro_footer " + this.props.footer.style}>
                {/* Footer Bottom */}
                <div className="andro_footer-bottom">
                    <div className="container">
                        <div className="andro_footer-copyright">
                            <p> Copyright PSK Komanda © 2021. All Rights Reserved. </p>
                            <Link to="#" className="andro_back-to-top" onClick={() => this.scrollToTop()}>Back to top <i className="fas fa-chevron-up" /> </Link>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;