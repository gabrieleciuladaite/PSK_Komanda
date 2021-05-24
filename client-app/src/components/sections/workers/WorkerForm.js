import React, { Component } from "react";
import RandExp from "randexp";

const generatedPassword = new RandExp(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{8,10}\w)/);
class WorkerForm extends Component{

  state ={
    generatedValue: ''
  };

  displayPassword()
  {
    let generated = generatedPassword.gen()
    console.log(generated);
    //this.setState({generatedPassword: generated});
  }

  render(){
    return (
      <div className="section">
        <div className="container">
          <form method="post">
            <div className="row">
              <div className="col-xl">
                {/* New Worker's Information Start*/}
                <h4> Add new worker</h4>
                <div className="row">
                  <div className="form-group col-xl-6">
                    <label>
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="fname"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lname"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phone"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Password"
                      //value ={this.state.generatedValue}
                      name="password"
                      className="form-control"
                      required
                    />
                    <button
                  type="button"
                  className="andro_btn-custom primary btn-block"
                  onClick={this.displayPassword}
                >
                  Generate password
                </button>
                  </div>
                  
                </div>
                <button
                  type="button"
                  className="andro_btn-custom primary btn-block"
                >
                  Add new worker
                </button>
                {/* New Worker's Information End */}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
    
}

export default WorkerForm;
