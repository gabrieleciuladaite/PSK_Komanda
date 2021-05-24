import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            surName: '',
            username: '',
            email: '',
            password: '',
            city: '',
            street: '',
            postIndex: '',
            houseNumber: '',
            flatNumber: '',
            phoneNumber: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name);

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        localStorage.setItem('registeredUser', JSON.stringify(this.state));
    }


    render() {
        return (
            <div className="section ">
                <div className="container ">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-xl-7">
                                <h4>Create a new account!</h4>
                                <div className="row">
                                    <div className="form-group col-xl-6">
                                        <label>First Name <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Last Name <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Last Name" name="surName" value={this.state.surName} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Username <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Last Name" name="username" value={this.state.username} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Password <span className="text-danger">*</span></label>
                                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Email Address <span className="text-danger">*</span></label>
                                        <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Street Address <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Street Address" name="street" value={this.state.street} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>House Number <span className="text-danger">*</span></label>
                                        <input type="Number" placeholder="Street Number" name="houseNumber" value={this.state.houseNumber} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Flat Number </label>
                                        <input type="text" placeholder="Flat Number" name="flatNumber" value={this.state.flatNumber} onChange={this.handleInputChange} className="form-control" />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Postal Code <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Postal Code" name="postIndex" value={this.state.postIndex} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Town / City <span className="text-danger">*</span></label>
                                        <input type="text" placeholder="Town / City" name="city" value={this.state.city} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <div className="form-group col-xl-6">
                                        <label>Phone Number <span className="text-danger">*</span></label>
                                        <input type="phone" placeholder="Phone Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} className="form-control" required />
                                    </div>
                                    <button type="submit" className="andro_btn-custom primary btn-block">Register</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Content;