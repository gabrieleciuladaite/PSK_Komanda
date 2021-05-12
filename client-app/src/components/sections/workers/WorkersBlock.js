import { Component } from "react";
import { render } from "react-dom";
import workerList from '../../../data/workers.json';

class WorkersBlock extends Component
{
    render()
    {
        return(
            <div className="section">
                <div className = "container">
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
                                        <button type="button" className="close-btn close-danger remove-from-cart">
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