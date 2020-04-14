import React from "react";

class EditEmailPopup extends React.Component{
    constructor(props){ 
        super(props);  
        this.state = { 
            idtableEmail: this.props.idtableEmail,
            tableEmailEmailAddress:'',
            errors:{
                tableEmailEmailAddress: ''
            }
        };  
     }

    handleUserInput = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        const emailRegex = new RegExp(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)\.([a-zA-Z]{2,5})$/i);
        switch (name) {
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
        if(this.validateForm(this.state.errors)) {
            const dataToSend = JSON.stringify({
                tableEmailEmailAddress: this.state.tableEmailEmailAddress,
                tableEmailValidate: true
            });
            fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/email/"+this.state.idtableEmail, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: dataToSend
            })
            .then((response) => response.json())
            .then(() => {
                this.props.emailList();
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
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/email/"+this.state.idtableEmail, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                idtableEmail:response.idtableEmail,
                tableEmailEmailAddress:response.tableEmailEmailAddress,
                tableEmailValidate:response.tableEmailValidate
            });
            console.log(this.state.tableEmailEmailAddress)
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
                            <label>Email:</label>
                            <input type="email" className="form-control" name="tableEmailEmailAddress" value={this.state.tableEmailEmailAddress} onChange={this.handleUserInput.bind(this)} required></input>
                            {this.state.errors.tableEmailEmailAddress.length > 0 && <span className='error'>{this.state.errors.tableEmailEmailAddress}</span>}
                        </div>
                        <button className="btn btn-primary">Save</button>
                        <button className="btn btn-primary" onClick={this.props.closePopup}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default EditEmailPopup;