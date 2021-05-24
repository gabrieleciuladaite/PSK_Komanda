import { Component} from "react";
import workerList from '../../../data/workers.json';


class WorkersBlock extends Component
{
    constructor()
    {
        super();
        this.state = {
            rows: workerList,
        };
    }

    deleteWorker = (id) =>{
        console.log(id-1);
        let table = document.querySelector('tbody');
        table.deleteRow(id-1);
    };

    render()
    {
        return(
            <div className="section">
                <div className = "container col-2xl">
                    <h4>Remove worker</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th className="remove-item"/>
                            </tr>
                        </thead>
                        <tbody>
                            {workerList.map((item, i) =>(
                                <tr key = {i}>
                                    <td data-title="First Name">{item.name}</td>
                                    <td data-title="Last Name">{item.surname}</td>
                                    <td data-title="Email Address">{item.email}</td>
                                    <td data-title="Phone Number">{item.phone}</td>
                                    <td className="remove">
                                        <button type="button" className="close-btn close-danger remove-from-cart" onClick={()=> {this.deleteWorker(i) }} >
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
}

export default WorkersBlock;