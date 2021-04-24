import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import shopbox from '../../../data/shop.json';
import { OverlayTrigger, Tooltip, Tab, Nav } from "react-bootstrap";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 1
        };
    }
    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
    };

    DecreaseItem = () => {
        if (this.state.clicks < 1) {
            this.setState({
                clicks: 0,
            });
        } else {
            this.setState({
                clicks: this.state.clicks - 1,
            });
        }
    };
    handleChange(event) {
        this.setState({ clicks: event.target.value });
    }
    render() {
        return (
            <Fragment>
                {shopbox.filter(product => { return product.id === parseInt(this.props.productId) }).map((item, i) => (
                    <Fragment key={i}>
                        {/* Product Content Start */}
                        <div className="section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="andro_product-single-thumb">
                                            <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="andro_product-single-content">
                                            <h3> {item.title} </h3>
                                            <div className="andro_product-price">
                                                {
                                                    item.discount > 0 || item.discount !== '' ? <span>{new Intl.NumberFormat().format((item.price * (100 - item.discount) / 100).toFixed(2))}$</span> : ''
                                                }
                                                <span>{new Intl.NumberFormat().format((item.price).toFixed(2))}$</span>
                                            </div>
                                            <p className="andro_product-excerpt">{item.shortdesc}</p>
                                            <form className="andro_product-atc-form">
                                                <div className="andro_product-variation-wrapper">
                                                    <div className="form-group">
                                                        <select className="form-control" name="amount">
                                                            <option value>Select Amount</option>
                                                            <option value={10}>10 Pieces</option>
                                                            <option value={20}>20 Pieces</option>
                                                            <option value={30}>30 Pieces</option>
                                                            <option value={40}>40 Pieces</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <select className="form-control" name="breed">
                                                            <option value>Select a Breed</option>
                                                            <option value="italian">Italian</option>
                                                            <option value="egyptian">Egyptian</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="qty-outter">
                                                    <Link to={"/product-single/" + item.id} className="andro_btn-custom">Buy Now</Link>
                                                    <div className="qty">
                                                        <span className="qty-subtract" onClick={this.DecreaseItem} data-type="minus" data-field><i className="fa fa-minus" /></span>
                                                        <input type="text" name="clicks" value={this.state.clicks} onChange={this.handleChange.bind(this)} />
                                                        <span className="qty-add" onClick={this.IncrementItem} data-type="plus" data-field><i className="fa fa-plus" /></span>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product Content End */}
                        {/* Additional Information Start */}
                        <div className="section pt-0">
                            <div className="container">
                                <div className="andro_product-additional-info">
                                    <Tab.Container defaultActiveKey="description">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <Nav variant="tab" className="andro_sticky-section">
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="description">Description</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="add-info">Additional Information</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </div>
                                            <div className="col-lg-8">
                                                <Tab.Content>
                                                    <Tab.Pane eventKey="description">
                                                        <h4>Description</h4>
                                                        <div dangerouslySetInnerHTML={{ __html: item.longdescription }} />
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="add-info">
                                                        <h4>Additional Information</h4>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Attributes</th>
                                                                    <th scope="col">Values</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td> <strong>Color</strong> </td>
                                                                    <td>
                                                                        {item.color.map((item, i) => (
                                                                            <Fragment key={i}>
                                                                                {item},
                                                                            </Fragment>
                                                                        ))}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td> <strong>Material</strong> </td>
                                                                    <td>
                                                                        {item.material.map((item, i) => (
                                                                            <Fragment key={i}>
                                                                                {item},
                                                                            </Fragment>
                                                                        ))}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </div>
                                        </div>
                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                        {/* Additional Information End */}
                    </Fragment>
                ))}
            </Fragment>
        );
    }
}

export default Content;