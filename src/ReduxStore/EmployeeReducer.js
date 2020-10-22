import * as actionTypes from './ConstantNames';

const initialState = {
    FilterEmployee: "ALL",
    Employees: {
        EmployeeName: "",
        EmployeeStatus: 1,
    },

    EmployeesStatusObj: { text: "Active", value: "1" },
    EmployeeStatusFilter: { text: "ALL", value: "ALL" },
    Employee_List: [],
};

const EmployeeReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case "RESET_EMPLOYEES":
            return initialState;
        case actionTypes.FILTEREMPLOYEE:
            return {
                ...state, FilterEmployee: action.value
            };
        case actionTypes.EMPLOYEESSTATUSOBJ:
            return {
                ...state, EmployeesStatusObj: action.value
            };
        case actionTypes.EMPLOYEESTATUSFILTER:
            return {
                ...state, EmployeeStatusFilter: action.value
            };
        case actionTypes.EMPLOYEES:
            return {
                ...state, Employees: action.value
            };
        case actionTypes.EMPLOYEE_LIST:
            return {
                ...state, Employee_List: action.value
            };
        case "CLEAR_FIELD":
            return {
                ...state,
                FilterEmployee: "ALL",
                Employees: {
                    EmployeeName: "",
                    EmployeeStatus: 1,
                },

                EmployeesStatusObj: { text: "Active", value: "1" },
                EmployeeStatusFilter: { text: "ALL", value: "ALL" },
            }
        default:
            return state;
    }
}
export default EmployeeReducer;