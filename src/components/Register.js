import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      role: [],
      name: '',
      email: '',
      password: '',
      selectedRole: 'Tester',
      errors: {
        name: '',
        email: '',
        password: ''
      }
    }
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

  onRegister = (event) => {
    event.preventDefault();
    const dataToSend = JSON.stringify({
      idtableUserId : Math.floor(Math.random() * 100),
      userName : this.state.name,
      userPass : this.state.password,
      userRole : this.state.selectedRole,
      userEmail : this.state.email
    });

    if(this.validateForm(this.state.errors)) {
      fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/user/signup", {
        method: "POST",
        headers: {
          clientId: 175,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: dataToSend
      })
      .then((response) => response.json())
      .then((response) => {
        if(response.idtableUserId){
          this.props.history.push('/login');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });      
    }else{
      console.error('Invalid Form')
    }
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  componentDidMount() {
    fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/user/role", {
      method: "GET",
      headers: {
        clientId: 175
      },
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({ role: response });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onRegister}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="form-control" name="name" placeholder="Enter your name" required onChange={this.handleUserInput.bind(this)}></input>
            {this.state.errors.name.length > 0 && <span className='error'>{this.state.errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your e-mail address" required onChange={this.handleUserInput.bind(this)}></input>
            {this.state.errors.email.length > 0 && <span className='error'>{this.state.errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" name="password" placeholder="Enter your password" required onChange={this.handleUserInput.bind(this)}></input>
            {this.state.errors.password.length > 0 && <span className='error'>{this.state.errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select className="form-control" name="selectedRole" onChange={this.handleUserInput.bind(this)}> 
              {this.state.role.map((value) => {
                return <option key={value.idtableEmployeeRoleId}>{value.role}</option>
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary"> Register </button>
        </form>
        <Link to="/login">Already have an account?</Link>
      </React.Fragment>
    );
  }
}
export default Register;
