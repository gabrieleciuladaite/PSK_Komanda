import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

function WorkersBlock() {
  const [worker, setWorker] = useState([]);
  const api = axios.create({
    baseURL: "http://134.209.227.30:5000/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });

  useEffect(() => {
    const getWorkers = async () => {
      let data = await api.get("/User/users").then(({ data }) => data);
      console.log(data);
      let workers = data.filter(worker => worker.role === 1);
      setWorker(workers);
      console.log(worker);
    };
    getWorkers();
  }, []);
  /*async function deleteWorker(id) {
    await api
      .delete(`/ItemBundle/${id}`, {
        _method: "DELETE",
      })
      .then((response) => {
        toast.success("Worker is deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured");
      });
    }
*/
  return (
    <div className="section">
        <ToastContainer position="bottom-right" />
      <div className="container col-2xl">
        <h4>Remove worker</h4>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th className="remove-item" />
            </tr>
          </thead>
          <tbody>
            {worker.map((worker) => (
              <tr key={worker.username}>
                <td data-title="First Name">{worker.firstName}</td>
                <td data-title="Last Name">{worker.lastName}</td>
                <td data-title="Email Address">{worker.email}</td>
                <td className="remove">
                  <button
                    type="button"
                    className="close-btn close-danger remove-from-cart"
                    /*onClick={() => {
                      deleteWorker(item.username);
                    }}*/
                  >
                    <span />
                    <span />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkersBlock;
