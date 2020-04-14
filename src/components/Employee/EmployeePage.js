import React from "react";
import ViewEmployeePopup from "./ViewEmployeePopup";
import CreateEmployeePopup from "./CreateEmployeePopup";
import EditEmployeePopup from "./EditEmployeePopup";
import DeleteEmployeePopup from "./DeleteEmployeePopup";
import Header from "../Header";
import PdfEmployee from './PdfEmployee';
import { PDFDownloadLink } from '@react-pdf/renderer';

class EmployeePage extends React.Component{
    constructor(props){  
        super(props);  
        this.state = { 
            showCreatePopup: false,
            showViewPopup: false,
            showEditPopup: false,
            showDeletePopup: false,
            userid: window.localStorage.getItem('userid'),
            idtableEmployeeId: '',
            empList: []
        };  
    }  

    toggleCreatePopup(){
        this.setState({  
            showCreatePopup: !this.state.showCreatePopup
       }); 
    }

    toggleViewPopup(event){
        this.setState({  
            showViewPopup: !this.state.showViewPopup,
            idtableEmployeeId: event ? event.target.parentNode.parentNode.id : ''
       }); 
    }

    toggleEditPopup(event){
        this.setState({  
            showEditPopup: !this.state.showEditPopup,
            idtableEmployeeId: event ? event.target.parentNode.parentNode.id : ''
       }); 
    }

    toggleDeletePopup(event){
        this.setState({  
            showDeletePopup: !this.state.showDeletePopup,
            idtableEmployeeId: event ? event.target.parentNode.parentNode.id : ''
       }); 
    }

    getEmployees = () => {
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/employee/", {
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
                empList: response
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });  
    }

    componentDidMount(){
        this.getEmployees();
    }

    render(){
        return(
            <div className="employeepage-container">
                <Header/>
                <button className="btn btn-primary" onClick={this.toggleCreatePopup.bind(this)}> Create Employee Popup </button>  
                {this.state.showCreatePopup ?  
                <CreateEmployeePopup closePopup={this.toggleCreatePopup.bind(this)} userid={this.state.userid} empList={this.getEmployees.bind(this)}/>  
                : null  
                } 

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>DOB</th>
                            <th>DOJ</th>
                            <th>Salary</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Pdf</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.empList.map((item, index) =>{
                            return(
                                <tr key={index} id={item.idtableEmployeeId}>
                                    <td>{item.idtableEmployeeId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.tableEmployeeEmailAddress}</td>
                                    <td>{item.tableEmployeeDOB.split("T")[0]}</td>
                                    <td>{item.tableEmployeeDOJ.split("T")[0]}</td>
                                    <td>{item.tableEmployeeSalary}</td>
                                    <td>{item.tableEmployeeGender}</td>
                                    <td>{item.tableEmployeeRole}</td>
                                    <td><i className="fa fa-eye" onClick={this.toggleViewPopup.bind(this)}></i></td>
                                    <td><i className="fa fa-pencil-square-o" onClick={this.toggleEditPopup.bind(this)}></i></td>
                                    <td><i className="fa fa-trash" onClick={this.toggleDeletePopup.bind(this)}></i></td>
                                    <td>
                                        <PDFDownloadLink document={<PdfEmployee userid={this.state.userid} item={item}/>} fileName="employee.pdf">
                                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <i className="fa fa-file-pdf-o"></i>)}
                                        </PDFDownloadLink>
                                    </td>
                                </tr>   
                            );                             
                        })}
                    </tbody>
                </table>
                {this.state.showViewPopup ?  
                <ViewEmployeePopup closePopup={this.toggleViewPopup.bind(this)} userid={this.state.userid} idtableEmployeeId = {this.state.idtableEmployeeId} />  
                : null  
                } 
                {this.state.showEditPopup ?  
                <EditEmployeePopup closePopup={this.toggleEditPopup.bind(this)} userid={this.state.userid} idtableEmployeeId = {this.state.idtableEmployeeId} empList={this.getEmployees.bind(this)} />  
                : null  
                } 
                {this.state.showDeletePopup ?  
                <DeleteEmployeePopup closePopup={this.toggleDeletePopup.bind(this)} userid={this.state.userid} idtableEmployeeId = {this.state.idtableEmployeeId} empList={this.getEmployees.bind(this)} />  
                : null  
                } 
            </div>
        );
    }
}
export default EmployeePage;