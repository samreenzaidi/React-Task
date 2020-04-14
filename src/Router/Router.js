import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import EmployeePage from "../components/Employee/EmployeePage";
import { Switch, Route } from "react-router-dom";
import EmailPage from "../components/Email/EmailPage";

function Router() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Register} ></Route>
        <Route exact path="/login" component={Login} ></Route>
        <Route exact path="/employeepage" component={EmployeePage} ></Route>
        <Route exact path="/emailpage" component={EmailPage} ></Route>
      </Switch>
    </React.Fragment>
  );
}

export default Router;
