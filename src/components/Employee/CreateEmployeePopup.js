import React from "react";

class CreateEmployeePopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userid: this.props.userid,
            name: '',
            empcode: '',
            email: '',
            dob: '',
            doj: '',
            salary: '',
            role: [],
            selectedGender: 'Female',
            selectedRole: 'Tester',
            errors: {
                name: '',
                empcode: '',
                email: ''
            }
        }
    }

    onSave = (event) => {
        event.preventDefault();
        const dataToSend = JSON.stringify({
            name: this.state.name,
            tableEmployeeEmailAddress: this.state.email,
            tableEmployeeDOB: this.state.dob,
            tableEmployeeDOJ: this.state.doj,
            tableEmployeeSalary: this.state.salary,
            tableEmployeeGender: this.state.selectedGender,
            tableEmployeeRole: this.state.selectedRole
        });
        if(this.validateForm(this.state.errors)) {
            fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/employee/", {
                method: "POST",
                headers: {
                    clientId: 175,
                    userid: this.state.userid,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: dataToSend
            })
            .then((response) => response.json())
            .then(() => {
                this.props.empList();
                this.props.closePopup();
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

    formattedSalary = (event) => {
        let newValue = "";
        if(event.key == 'Backspace'){
            return true;
        }
        if(event.key == '.'){
            newValue = this.state.salary + event.key;
            this.setState({
                salary: newValue
            });
           return true;
        }

        newValue = this.state.salary + String.fromCharCode(event.keyCode);        
        this.setState({
            newValue: newValue
        });
        
        if (isNaN(newValue) || this.hasDecimalPlace(newValue, 4)) {
            event.preventDefault();
            return false;
        }

        this.setState({
            salary: parseFloat(newValue)
        });
    };
    
    hasDecimalPlace = (value, x) => {
        var pointIndex = value.indexOf('.');
        return  pointIndex >= 0 && pointIndex < value.length - x;
    }

    handleUserInput = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        const emailRegex = new RegExp(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)\.([a-zA-Z]{2,5})$/i);
        const nameRegex = new RegExp(/^[A-Za-z]+$/);
        const empcodeRegex = new RegExp(/^[A-Za-z0-9]+$/);
        switch (name) {
        case 'name': 
            errors.name = nameRegex.test(value) ? '' : 'Please input alphabets only';
            break;
        case 'empcode': 
            errors.empcode = empcodeRegex.test(value) ? '' : 'Please input alphabets and numbers only';
            break;
        case 'email': 
            errors.email = emailRegex.test(value) ? '' : 'Please input a valid email address';
            break;
        default:
            break;
        }
        this.setState({
            errors, [name]: value
        });
    }

    render(){
        return(
            <div className="popup">
                <div className='popup_inner'>  
                    <form onSubmit={this.onSave}> 
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" name="name" placeholder="Enter your name" onChange={this.handleUserInput.bind(this)} required ></input>
                            {this.state.errors.name.length > 0 && <span className='error'>{this.state.errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label>Employee Code:</label>
                            <input type="text" className="form-control" name="empcode" placeholder="Enter your name" onChange={this.handleUserInput.bind(this)} required></input>
                            {this.state.errors.empcode.length > 0 && <span className='error'>{this.state.errors.empcode}</span>}
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter your name" onChange={this.handleUserInput.bind(this)} required></input>
                            {this.state.errors.email.length > 0 && <span className='error'>{this.state.errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label >DOB</label>
                            <input type="date" className="form-control" name="dob" max="2020-12-31"  min="1900-01-01" onChange={this.handleUserInput.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label >DOJ</label>
                            <input type="date" className="form-control" name="doj" max="2020-12-31"  min="1900-01-01" onChange={this.handleUserInput.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label >Salary</label>
                            <input type="text" className="form-control" name="salary" onKeyDown={this.formattedSalary.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label>Role:</label>
                            <select className="form-control" name="selectedRole" onChange={this.handleUserInput.bind(this)}> 
                            {this.state.role.map((value) => {
                                return <option key={value.idtableEmployeeRoleId}>{value.role}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" name="selectedGender" onChange={this.handleUserInput.bind(this)}> 
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">Save</button>
                        <button className="btn btn-primary" onClick={this.props.closePopup}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default CreateEmployeePopup;