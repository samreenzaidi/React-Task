import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        activeTabClassName: false
      }
    }

    toggleClass(event){
      this.setState({
        activeTabClassName: !this.state.activeTabClassName
      })
    }

    render(){
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/employeepage" className="nav-link">Employee Page</Link>
                </li>
                <li className="nav-item">
                    <Link to="/emailpage" className="nav-link">Email Page</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
  
  export default Header;
