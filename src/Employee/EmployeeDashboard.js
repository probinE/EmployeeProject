import React, { Component } from 'react';
import { MDBTable, MDBTableHead } from 'mdbreact';
import './App.css';
class EmployeeDashboard extends Component {
    render() {
        debugger;
        return (
            <MDBTable bordered style={{ borderCollapse: "collapse", width: "100%", }} >
                <MDBTableHead>
                    <tr>
                        <th style={{ width: "7%", fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3", background: "rgb(18 134 255)", color: "white" }}>
                            Sl No.
                        </th>
                        <th style={{ width: "43%", fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3", background: "rgb(18 134 255)", color: "white" }}>
                            Employee Name
                        </th>
                        <th style={{ width: "25%", fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3", background: "rgb(18 134 255)", color: "white" }}>
                            Employee Status
                        </th>
                        <th style={{ width: "25%", fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3", background: "rgb(18 134 255)", color: "white" }}>
                            Action
                        </th>
                    </tr>
                </MDBTableHead>
                {this.props.EmployeeDashBoard}
            </MDBTable>
        );
    }
}
export default EmployeeDashboard;