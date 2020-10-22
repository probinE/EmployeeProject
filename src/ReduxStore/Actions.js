
function AddEmp(EmployeeList) {
    debugger;
    return {
        type: "Employee_List",
        value: EmployeeList
    };
}
function ChangeEmpStatus(EmployeeListUpdate) {
    return {
        type: 'Employee_List',
        value: EmployeeListUpdate
    };
}
function ChangeEmpText(Employees) {
    return {
        type: 'Employees', value: Employees
    };
}
function EmployeesStatus(Status) {
    return {
        type: 'EmployeesStatusObj', value: Status
    };
}
function FilterStatus(EmployeeFilter) {
    return {
        type: 'FilterEmployee', value: EmployeeFilter
    };
}
function FilterStatusObj(Value) {
    return {
        type: 'EmployeeStatusFilter', value: Value
    };
}
function ClearField() {
    return {
        type: 'CLEAR_FIELD'
    };
}
function ResetEmp() {
    debugger;
    return {
        type: "RESET_EMPLOYEES",
    };
}
export const ChangeEmpDetails = (Employees) => {
    debugger;
    return function (dispatch) {
        dispatch(ChangeEmpText(Employees))
    };
}
export const AddEmployee = (EmployeeList) => {
    debugger;
    return function (dispatch) {
        dispatch(AddEmp(EmployeeList))
    };
}
export const ChangeEmployeeStatus = (EmployeeList) => {
    debugger;
    return function (dispatch) {
        dispatch(ChangeEmpStatus(EmployeeList))
    };
}
export const EmployeesStatusObj = (Status) => {
    debugger;
    return function (dispatch) {
        dispatch(EmployeesStatus(Status))
    };
}
export const FilterStatusvalues = (Value) => {
    debugger;
    return function (dispatch) {
        dispatch(FilterStatus(Value))
    };
}
export const FilterStatusObjs = (EmployeeFilter) => {
    debugger;
    return function (dispatch) {
        dispatch(FilterStatusObj(EmployeeFilter))
    };
}
export const ClearFieldStore = () => {
    debugger;
    return function (dispatch) {
        dispatch(ClearField())
    };
}
export const ResetEmployee = () => {
    debugger;
    return function (dispatch) {
        dispatch(ResetEmp())
    };
}
