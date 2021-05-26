import React, { useState } from "react";
import RandExp from "randexp";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

function WorkerForm(){

  const generatedPassword = new RandExp(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{8,10}\w)/);
  const [password, setPassword] = useState();
  const [worker, setWorker] = useState([]);
  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
  });

  function displayPassword()
  {
    let generated = generatedPassword.gen();
    console.log(generated);
    setPassword(generated);
  }
  async function createWorker() {
    setWorker((prevProduct)=>({...prevProduct, "role":1}))
    await (await api.post("/User/register/seller/", worker)
    .then(response => {
      toast.success("Worker is created successfully");
      localStorage.getItem('jwt', response.data.token);
    }))
  };

  function handleChange(e)
  {
    if(e.target.name==="password") setPassword(e.target.value);
    setWorker((prevWorker)=> ({...prevWorker, [e.target.name]: e.target.value}))
  }
  
    return (
      <div className="section">
        <ToastContainer position="bottom-right" />
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
                      name="firstName"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      className="form-control"
                      required
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Username <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Password"
                      value ={password}
                      name="password"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                    <br/>
                    <button
                  type="button"
                  className="andro_btn-custom primary btn-block"
                  onClick={displayPassword}
                >
                  Generate password
                </button>
                  </div>
                </div>
                <br/>
                <br/>
                <button
                  type="button"
                  className="andro_btn-custom primary btn-block"
                  onClick={createWorker}
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

export default WorkerForm;
