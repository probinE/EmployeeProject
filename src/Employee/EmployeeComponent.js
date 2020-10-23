import React, { Component } from 'react';
import './App.css';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { MDBTableBody } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/grid';
// import { DropDownList } from '@progress/kendo-react-dropdowns';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import EmployeeDashboard from './EmployeeDashboard';
import { connect } from 'react-redux';
// import { store } from '../ReduxStore/Store';
import * as ActionCreator from '../ReduxStore/Actions';

mobiscroll.settings = {
    theme: 'ios'
}
class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Filter: false,
            Dashboard: false,
            ErrorEmpName: false,
            ErrorEmpStatus: false,
            Error: false,
            EmployeeDetails: ""
        }
    }
    render() {
        const StatusDropdown = [
            { text: 'Deactive', value: '0' },
        ]
        const StatusDropdownFilter = [
            { text: 'Active', value: '1' },
            { text: 'Deactive', value: '0' },
        ]
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Card>
                            <div style={{ backgroundColor: "#a166a8", padding: "8px" }} >
                                <h5 style={{ textAlign: "center", color: "#fff", margin: "0.2rem", textTransform: "uppercase" }}>Employee Creation</h5>
                            </div>
                            {this.state.Filter === false ? (
                                <CardBody>
                                    <Grid container spacing={3} style={{ paddingLeft: "25%", margin: "0px" }}>
                                        <Grid item xs={12} s sm={3}>
                                            <DropDownList
                                                error={this.state.ErrorEmpStatus}
                                                name="EmployeeStatusFilter"
                                                label="Employee Status"
                                                value={this.props.Employee.EmployeeStatusFilter}
                                                onChange={this.handleChangeFilter}
                                                defaultItem={{ text: "ALL", value: "ALL" }}
                                                data={StatusDropdownFilter}
                                                valueField="value"
                                                textField="text"
                                            />
                                        </Grid>
                                        <Grid sm={3} style={{ marginTop: "22px" }}>
                                            <Button className="btnsecondarynew" onClick={this.getEmployees}>Get</Button>
                                            <Button className="btnsecondarynew" style={{ marginLeft: "3%" }} onClick={this.ToggleEmployee}>Add New</Button>
                                        </Grid>
                                    </Grid>
                                    {this.state.Dashboard === true ? (<div style={{ textAlign: "center", paddingLeft: "15%", paddingRight: "15%" }}>
                                        <EmployeeDashboard EmployeeDashBoard={this.state.EmployeeDetails} />
                                    </div>) : ""
                                    }
                                </CardBody >
                            ) :
                                (<CardBody>
                                    <Grid container spacing={3} style={{ paddingLeft: "25%", margin: "0px" }}>
                                        <Grid item xs={12} s sm={3}>
                                            <TextField
                                                required
                                                name="EmployeeName"
                                                label="Employee Name"
                                                inputProps={{ maxLength: 30 }}
                                                value={this.props.Employee.Employees.EmployeeName}
                                                onChange={this.OnChangeEmployees}
                                                error={this.state.ErrorEmpName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} s sm={3}>
                                            <DropDownList
                                                error={this.state.ErrorEmpStatus}
                                                name="EmployeeStatus"
                                                label="Employee Status"
                                                value={this.props.Employee.EmployeesStatusObj}
                                                onChange={this.OnChangeEmployees}
                                                defaultItem={{ text: "Active", value: "1" }}
                                                data={StatusDropdown}
                                                valueField="value"
                                                textField="text"
                                            />
                                        </Grid>
                                        <Grid sm={3} style={{ marginTop: "22px" }}>
                                            <Button className="btnsecondarynew" onClick={this.AddEmployees}>Submit</Button>
                                            <Button className="btnsecondarynew" style={{ marginLeft: "3%" }} onClick={this.ToggleEmployee}>Cancel</Button>
                                            <Button className="btnsecondarynew" style={{ marginLeft: "3%" }} onClick={this.ClearEmployee}>Clear</Button>
                                        </Grid>
                                    </Grid>
                                </CardBody >)
                            }
                        </Card >
                    </Col>
                </Row>
            </React.Fragment >
        )

    }
    componentDidMount = () => {
        debugger;
        this.ClearEmployee();
        // this.props.ResetEmployee();

    }
    FailedMessage = (Message) => {
        mobiscroll.toast({
            message: Message,
            color: 'danger',
            display: 'center'
        });
    }
    SuccessMessage = (Message) => {
        mobiscroll.toast({
            message: Message,
            color: 'success',
            display: 'center'
        });
    }
    Inactive = (e) => {
        debugger;
        let SeqID = e.target.id;
        mobiscroll.confirm({
            title: 'Alert!',
            message: 'Are you sure, You want to Activate this Employee?',
            okText: 'Yes',
            cancelText: 'No',
            callback: (res) => {
                mobiscroll.toast({
                    message: res ? this.InactiveStatus(SeqID) : 'Alert closed',
                    display: 'bottom',
                    color: 'white',
                    width: '1px',
                });
            }
        });
    }
    InactiveStatus = async (SeqID) => {
        debugger;
        let EmployeeList = this.props.Employee.Employee_List;
        let EmployeeListUpdate = [];
        for (let i = 0; i < EmployeeList.length; i++) {
            debugger;
            if (EmployeeList[i].SeqID == SeqID) {
                EmployeeList[i].EmployeeStatus = "1";
            }
            EmployeeListUpdate.push(EmployeeList[i]);
        }
        this.props.ChangeEmployee(EmployeeListUpdate);
        this.getEmployees();
    }
    ActiveStatus = async (SeqID) => {
        debugger;
        let EmployeeList = this.props.Employee.Employee_List;
        let EmployeeListUpdate = [];
        for (let i = 0; i < EmployeeList.length; i++) {
            debugger;
            if (EmployeeList[i].SeqID == SeqID) {
                EmployeeList[i].EmployeeStatus = "0";
            }
            EmployeeListUpdate.push(EmployeeList[i]);
        }
        this.props.ChangeEmployee(EmployeeListUpdate);
        this.getEmployees();
    }
    Active = (e) => {
        debugger;
        let SeqID = e.target.id;
        mobiscroll.confirm({
            title: 'Alert!',
            message: 'Are you sure, You want to DeActivate this Employee?',
            okText: 'Yes',
            cancelText: 'No',
            callback: (res) => {
                mobiscroll.toast({
                    message: res ? this.ActiveStatus(SeqID) : 'Alert closed',
                    display: 'bottom',
                    color: 'white',
                    width: '1px',
                });
            }
        });
    }
    handleChangeFilter = (e) => {
        debugger;
        let EmployeeFilter = this.props.Employee.FilterEmployee;
        EmployeeFilter = e.target.value;
        this.props.FilterStatusValueProps(e.target.value.value);
        debugger;
        this.props.FilterStatusObjProps(EmployeeFilter);

    }
    OnChangeEmployees = (e) => {
        debugger;
        let Employees = this.props.Employee.Employees;
        if (e.target.name == "EmployeeName") {
            Employees[e.target.name] = e.target.value;
            if (e.target.value !== "")
                this.setState({ ErrorEmpName: false })
        }
        if (e.target.name == "EmployeeStatus") {
            Employees[e.target.name] = e.target.value.value;
            this.props.EmployeesStatusObjProps(e.target.value);
        }
        if (Employees.EmployeeName !== "") {
            this.setState({ ErrorEmpName: false })
        }
        this.props.ChangeEmpDetailsProps(Employees);
    }
    AddEmployees = async (e) => {
        debugger;
        await this.setState({ Error: false })
        let Employees = this.props.Employee.Employees;
        if (Employees.EmployeeName == "") {
            await this.setState({ ErrorEmpName: true, Error: true })
        }
        if (Employees.EmployeeStatus == "") {
            await this.setState({ ErrorEmpStatus: true, Error: true })
        }
        if (this.state.Error === true) {
            return false;
        }
        let EmployeeList = this.props.Employee.Employee_List;
        var UniqueID = (new Date().getTime()).toString(10);
        EmployeeList.push({ SeqID: "Seq" + UniqueID, EmployeeName: this.props.Employee.Employees.EmployeeName, EmployeeStatus: this.props.Employee.Employees.EmployeeStatus })
        this.props.AddEmployee(EmployeeList);
        this.SuccessMessage("Employee Added Successfully");
        this.ClearEmployee();
        this.getEmployees();
        this.ToggleEmployee();
    }
    ClearEmployee = () => {
        debugger;
        this.props.ClearField();
    }
    getEmployees = async () => {
        debugger;
        let EmployeeList = this.props.Employee.Employee_List;
        let EmployeeFilter = this.props.Employee.FilterEmployee;
        if (EmployeeFilter == "ALL") {
        }
        else {
            EmployeeList = EmployeeList.filter(EmpStatus => EmpStatus.EmployeeStatus == EmployeeFilter)
        }
        if (EmployeeList.length > 0) {
            let employees = EmployeeList.map((Employee, index) => {
                debugger;
                let Count = index + 1;
                let Status;
                if (Employee.EmployeeStatus == "1") {
                    Status = "Active";
                }
                else {
                    Status = "Inactive";
                }
                return (<React.Fragment>
                    <MDBTableBody key={Employee.SeqID}>
                        <tr >
                            <td style={{ fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3" }}>
                                {Count}
                            </td>
                            <td style={{ fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3" }}>
                                {Employee.EmployeeName}
                            </td>
                            <td style={{ fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3" }}>
                                {Status}
                            </td>
                            <td style={{ fontWeight: "400", textAlign: "center", border: "1px solid #c8ced3" }} >
                                {Employee.EmployeeStatus == "0" ?
                                    <span style={{ cursor: "pointer", color: "red", textDecoration: "underline" }} id={Employee.SeqID} onClick={this.Inactive}>Activate</span>
                                    : <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} id={Employee.SeqID} onClick={this.Active}>Deactivate</span>
                                }
                            </td>
                        </tr>
                    </MDBTableBody>
                </React.Fragment>);
            });
            this.setState({ Dashboard: true, EmployeeDetails: employees })
        }
        else {
            await this.setState({ Dashboard: false, EmployeeDetails: "" })
            this.FailedMessage("No Record Found");
        }

    }
    ToggleEmployee = () => {
        debugger;
        this.setState(({ Filter }) => ({ Filter: !Filter }));
    }
}
const mapStatetoProps = state => {
    debugger;
    return {
        Employee: state.Employee
    };
}
const mapDispatchtoProps = dispatch => {
    return {
        ChangeEmpDetailsProps: (payload) => dispatch(ActionCreator.ChangeEmpDetails(payload)),
        EmployeesStatusObjProps: (payload) => dispatch(ActionCreator.EmployeesStatusObj(payload)),
        FilterStatusValueProps: (payload) => dispatch(ActionCreator.FilterStatusvalues(payload)),
        FilterStatusObjProps: (payload) => dispatch(ActionCreator.FilterStatusObjs(payload)),
        ChangeEmployee: (payload) => dispatch(ActionCreator.ChangeEmployeeStatus(payload)),
        AddEmployee: (payload) => dispatch(ActionCreator.AddEmployee(payload)),
        ClearField: () => dispatch(ActionCreator.ClearFieldStore()),
        ResetEmployee: () => dispatch(ActionCreator.ResetEmployee()),
    };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Employees); 
