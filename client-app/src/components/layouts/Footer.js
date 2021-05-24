import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <footer className={"andro_footer " + this.props.footer.style}>
                {/* Footer Bottom */}
                <div className="andro_footer-bottom">
                    <div className="container">
                        <div className="andro_footer-copyright">
                            <p> Copyright PSK Komanda © 2021. All Rights Reserved. </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;