import React, { Component } from 'react';
import './App.css';
import Employees from './Employee/EmployeeComponent';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Employees />
      </React.Fragment>
    )
  }
}

export default App;
