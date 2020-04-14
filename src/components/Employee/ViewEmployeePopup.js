import React from "react";

class ViewEmployeePopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userid: this.props.userid,
            idtableEmployeeId: this.props.idtableEmployeeId,
            name: '',
            tableEmployeeEmailAddress: '',
            tableEmployeeDOB: '',
            tableEmployeeDOJ: '',
            tableEmployeeSalary: '',
            tableEmployeeGender: '',
            tableEmployeeRole: ''
        }
    }

    componentDidMount(){
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
                    <div className="form-group">
                        <label>ID:</label>
                        <input type="text" className="form-control" value={this.state.idtableEmployeeId} disabled ></input>
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" value={this.state.name} disabled></input>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" value={this.state.tableEmployeeEmailAddress} disabled></input>
                    </div>
                    <div className="form-group">
                        <label >DOB</label>
                        <input type="date" className="form-control" value={this.state.tableEmployeeDOB} disabled></input>
                    </div>
                    <div className="form-group">
                        <label >DOJ</label>
                        <input type="date" className="form-control" value={this.state.tableEmployeeDOJ} disabled></input>
                    </div>
                    <div className="form-group">
                        <label >Salary</label>
                        <input type="text" className="form-control" value={this.state.tableEmployeeSalary} disabled></input>
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select className="form-control" disabled> 
                            <option>{this.state.tableEmployeeRole}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <select className="form-control" disabled> 
                            <option>{this.state.tableEmployeeGender}</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={this.props.closePopup}>Close</button>
                </div>
            </div>
        );
    }
}
export default ViewEmployeePopup;