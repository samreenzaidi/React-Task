import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import './components/Interceptor';

class App extends React.Component {
 render() {
  return(
   <div className="container">
    <BrowserRouter>
        <Router/>
    </BrowserRouter>,
   </div>
  );
 }
}
export default App;