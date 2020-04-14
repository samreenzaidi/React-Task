import React from "react";
import EditEmailPopup from './CreateEmailPopup';
import DeleteEmailPopup from './DeleteEmailPopup';
import CreateEmailPopup from './CreateEmailPopup';
import Header from "../Header";

class EmailPage extends React.Component{
    constructor(props){ 
        super(props);  
        this.state = { 
            showCreatePopup: false,
            showEditPopup: false,
            showDeletePopup: false,
            idtableEmail: '',
            emailData: []
        };  
     }

    toggleCreatePopup(){
        this.setState({  
            showCreatePopup: !this.state.showCreatePopup
       }); 
    }

    toggleEditPopup(event){
        this.setState({  
            showEditPopup: !this.state.showEditPopup,
            idtableEmail: event ? event.target.parentNode.parentNode.id : ''
       }); 
    }

    toggleDeletePopup(event){
        this.setState({  
            showDeletePopup: !this.state.showDeletePopup,
            idtableEmail: event ? event.target.parentNode.parentNode.id : ''
       }); 
    }

    getEmails(){
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/email/", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                emailData: response
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    componentDidMount(){
        this.getEmails();
    }

    render(){
        return(
            <div className="emailpage-container">
                <Header/>
                <button className="btn btn-primary" onClick={this.toggleCreatePopup.bind(this)} > Create Email Popup </button>  
                
                {this.state.showCreatePopup ?  
                <CreateEmailPopup closePopup={this.toggleCreatePopup.bind(this)} emailList={this.getEmails.bind(this)} />  
                : null  
                } 

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Email Address</th>
                            <th>Email Validate</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.emailData.map((item, index) =>{
                            return(
                                <tr key={index} id={item.idtableEmail}>
                                    <td>{item.idtableEmail}</td>
                                    <td>{item.tableEmailEmailAddress}</td>
                                    <td>{item.tableEmailValidate.toString()}</td>
                                    <td><i className="fa fa-pencil-square-o" onClick={this.toggleEditPopup.bind(this)}></i></td>
                                    <td><i className="fa fa-trash" onClick={this.toggleDeletePopup.bind(this)}></i></td>
                                </tr>   
                            );                             
                        })}
                    </tbody>
                </table>

                {this.state.showEditPopup ?  
                <EditEmailPopup closePopup={this.toggleEditPopup.bind(this)} idtableEmail = {this.state.idtableEmail} emailList={this.getEmails.bind(this)} />  
                : null  
                } 

                {this.state.showDeletePopup ?  
                <DeleteEmailPopup closePopup={this.toggleDeletePopup.bind(this)} idtableEmail = {this.state.idtableEmail} emailList={this.getEmails.bind(this)} />  
                : null  
                } 
            </div>
        );
    }
}
export default EmailPage;