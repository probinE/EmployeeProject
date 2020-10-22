import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import EmployeeReducer from './EmployeeReducer';
import createEncryptor from "redux-persist-transform-encrypt"

const encryptor = createEncryptor({
    secretKey: "my-super-secret-key",
    onError: function (error) {
        // Handle the error.
    }
})
const persistConfig = {
    key: "FrontEndroot",
    storage,
    whiteList: ['EmployeeReducer'],
    transforms: [encryptor],
}


const RootReducer = combineReducers({
    Employee: EmployeeReducer
});

export default persistReducer(persistConfig, RootReducer);