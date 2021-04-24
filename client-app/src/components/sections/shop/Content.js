import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import shopbox from '../../../data/shop.json';
import Loader from '../../layouts/Loader';
import classNames from 'classnames';


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            items: shopbox,
            currentPage: 1,
            itemsPerPage: 6,
            loading: false
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    // Modal
    modalShow() {
        this.setState({ modalshow: true });
    }
    modalClose() {
        this.setState({ modalshow: false });
    }
    handleClick(event) {
        var paginationContent = event.target.closest('.pagination-content');

        if (paginationContent) {
            paginationContent.scrollIntoView();
        }

        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                currentPage: Number(event.target.getAttribute('data-page')),
                loading: false
            });
        }, 2000);

    }
    render() {
        const { items, currentPage, itemsPerPage } = this.state;

        // Logic for displaying items
        const indexOfLastitem = currentPage * itemsPerPage;
        const indexOfFirstitem = indexOfLastitem - itemsPerPage;
        const currentitems = items.slice(indexOfFirstitem, indexOfLastitem);

        const renderitems = currentitems.map((item, i) => {
            return <div key={i} className="col-md-4 col-sm-6 masonry-item">
                <div className="andro_product andro_product-has-controls">
                    <div className="andro_product-thumb">
                        <Link to={"/product-single/" + item.id}>
                            <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                        </Link>
                    </div>
                    <div className="andro_product-body">
                        <h5 className="andro_product-title"><Link to={"/product-single/" + item.id}> {item.title} </Link> </h5>
                        <div className="andro_product-price">
                            {
                                item.discount > 0 || item.discount !== '' ? <span>{new Intl.NumberFormat().format((item.price * (100 - item.discount) / 100).toFixed(2))}$</span> : ''
                            }
                            <span>{new Intl.NumberFormat().format((item.price).toFixed(2))}$</span>
                        </div>
                        <p>{item.shortdesc}</p>
                    </div>
                </div>
            </div>

        });
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPagination = pageNumbers.map(number => {
            const activeCondition = this.state.currentPage === number ? 'active' : ''
            return (
                <Fragment key={number}>
                    {pageNumbers.length > 1 ? <li className={classNames("page-item", { "active": activeCondition })}>
                        <Link className="page-link" to="#" data-page={number} onClick={this.handleClick}>{number}</Link>
                    </li> : ''}
                </Fragment>
            );
        });
        const imagesLoadedOptions = {
            itemSelector: '.masonry-item',
        }
        return (
            <div className="section pagination-content">
                <div className="container">
                    {/* Product Count & Orderby Start */}
                    <div className="andro_shop-global">
                        <p>Showing <b>{this.state.itemsPerPage}</b> of <b>{shopbox.length}</b> products </p>
                        <form method="post">
                            <select className="form-control" name="orderby">
                                <option value="default">Default sorting</option>
                                <option value="price-down">Price: High - Low</option>
                                <option value="price-up">Price: Low - High</option>
                            </select>
                        </form>
                    </div>
                    {/* Product Count & Orderby End */}
                    <Masonry className="row justify-content-center masonry" imagesLoadedOptions={imagesLoadedOptions}>
                        {/* Product Start */}
                        {this.state.loading === false ? renderitems : <Loader />}
                        {/* Product End */}
                    </Masonry>
                    {/* Pagination Start */}
                    {pageNumbers.length > 1 ?
                        <ul className="pagination">
                            {/* Prev */}
                            {/* to show previous, we need to be on the 2nd or more page */}
                            {pageNumbers.length > 1 && this.state.currentPage !== 1 ?
                                <li className="page-item">
                                    <Link className="page-link" to="#" data-page={this.state.currentPage - 1} onClick={this.handleClick}>
                                        <span aria-hidden="true">«</span>
                                        <span className="sr-only">Previous</span>
                                    </Link>
                                </li>
                                : ''}
                            {/* Prev */}
                            {renderPagination}
                            {/* Next */}
                            {/* to show next, we should not be on the last page */}
                            {pageNumbers.length > 1 && this.state.currentPage !== pageNumbers.length ? <li className="page-item">
                                <Link className="page-link" to="#" data-page={parseInt(this.state.currentPage + 1)} onClick={this.handleClick}>
                                    <span aria-hidden="true">»</span>
                                    <span className="sr-only">Next</span>
                                </Link>
                            </li>
                                : ''}
                            {/* Next */}
                        </ul> : ''}
                    {/* Pagination End */}
                </div>
            </div>
        );
    }
}

export default Content;