import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userid: '',
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    }
  }

  onLogin = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/user/login?email="+email+"&password="+password, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
      })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          userid: response
        });   
        window.localStorage.setItem("userid", this.state.userid);
        this.props.history.push('/employeepage');
      })
      .catch((error) => {
        console.error("Error:", error);
      }
    );
  }

  handleUserInput = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    const passwordRegex = new RegExp(/^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/i);
    const emailRegex = new RegExp(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)\.([a-zA-Z]{2,5})$/i);
    switch (name) {
      case 'email': 
        errors.email = emailRegex.test(value) ? '' : 'Please enter a valid email address';
        break;
      case 'password': 
        errors.password = passwordRegex.test(value) ? '' : 'Password must contain One Character, One Numeric, One special Character, Min Length 8';
        break;
      default:
        break;
    }
    this.setState({
      errors, [name]: value
    });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your name" required onChange={this.handleUserInput.bind(this)}></input>
            {this.state.errors.email.length > 0 && <span className='error'>{this.state.errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" className="form-control" placeholder="Enter your password" required onChange={this.handleUserInput.bind(this)}></input>
            {this.state.errors.password.length > 0 && <span className='error'>{this.state.errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <Link to="/">Back to Sign Up </Link>
      </React.Fragment>
    );
  }
}
export default Login;
