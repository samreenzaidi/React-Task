import React from "react";

class EditEmployeePopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userid: this.props.userid,
            idtableEmployeeId: this.props.idtableEmployeeId,
            name: '',
            role: [],
            errors: {
                name: '',
                email: ''
            }
        }
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
            tableEmployeeSalary: parseFloat(newValue)
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
        switch (name) {
        case 'name': 
            errors.name = nameRegex.test(value) ? '' : 'Please input alphabets only';
            break;
        case 'tableEmployeeEmailAddress': 
            errors.email = emailRegex.test(value) ? '' : 'Please input a valid email address';
            break;
        default:
            break;
        }
        this.setState({
        errors, [name]: value
        });
    }

    OnUpdate = (event) => {
        event.preventDefault();
        const dataToSend = JSON.stringify({
            name: this.state.name,
            tableEmployeeEmailAddress: this.state.tableEmployeeEmailAddress,
            tableEmployeeDOB: this.state.tableEmployeeDOB,
            tableEmployeeDOJ: this.state.tableEmployeeDOJ,
            tableEmployeeSalary: this.state.tableEmployeeSalary,
            tableEmployeeGender: this.state.tableEmployeeGender,
            tableEmployeeRole: this.state.tableEmployeeRole
        });
        if(this.validateForm(this.state.errors)) {
            fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/employee/"+this.state.idtableEmployeeId, {
                method: "PUT",
                headers: {
                    clientId: 175,
                    userid: this.state.userid,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: dataToSend
            })
            .then((response) => response.json())
            .then((response) => {
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

    componentDidMount(){
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
        
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/employee/"+this.state.idtableEmployeeId, {
            method: "GET",
            headers: {
                clientId: 175,
                userid: this.state.userid,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                idtableEmployeeId: response.idtableEmployeeId,
                name: response.name,
                tableEmployeeEmailAddress: response.tableEmployeeEmailAddress,
                tableEmployeeDOB: response.tableEmployeeDOB.split("T")[0],
                tableEmployeeDOJ: response.tableEmployeeDOJ.split("T")[0],
                tableEmployeeSalary: response.tableEmployeeSalary,
                tableEmployeeGender: response.tableEmployeeGender,
                tableEmployeeRole: response.tableEmployeeRole
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });  
    }

    render(){
        return(
            <div className="popup">
                <div className='popup_inner'>  
                    <form onSubmit={this.OnUpdate}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleUserInput.bind(this)} required></input>
                            {this.state.errors.name.length > 0 && <span className='error'>{this.state.errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" name="tableEmployeeEmailAddress" value={this.state.tableEmployeeEmailAddress} onChange={this.handleUserInput.bind(this)} required></input>
                            {this.state.errors.email.length > 0 && <span className='error'>{this.state.errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label >DOB</label>
                            <input type="date" className="form-control" name="tableEmployeeDOB" value={this.state.tableEmployeeDOB} onChange={this.handleUserInput.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label >DOJ</label>
                            <input type="date" className="form-control" name="tableEmployeeDOJ" value={this.state.tableEmployeeDOJ} onChange={this.handleUserInput.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label >Salary</label>
                            <input type="text" className="form-control" name="tableEmployeeSalary" value={this.state.tableEmployeeSalary} onKeyDown={this.formattedSalary.bind(this)} required></input>
                        </div>
                        <div className="form-group">
                            <label>Role:</label>
                            <select className="form-control" name="tableEmployeeRole" onChange={this.handleUserInput.bind(this)}> 
                            {this.state.role.map((value) => {
                                return <option key={value.idtableEmployeeRoleId} selected={value.role == this.state.tableEmployeeRole}>{value.role}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" name="tableEmployeeGender" onChange={this.handleUserInput.bind(this)}> 
                                <option selected={"female" == this.state.tableEmployeeGender}>female</option>
                                <option selected={"male" == this.state.tableEmployeeGender}>male</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">Update</button>
                        <button className="btn btn-primary" onClick={this.props.closePopup}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default EditEmployeePopup;