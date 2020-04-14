import React from "react";

class DeleteEmployeePopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userid: this.props.userid,
            idtableEmployeeId: this.props.idtableEmployeeId
        }
    }

    OnDelete = (event) =>{
        event.preventDefault();
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/employee/"+this.state.idtableEmployeeId, {
            method: "DELETE",
            headers: {
                clientId: 175,
                userid: this.state.userid,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then((response) => response.json())
        .then((response) => {
            this.props.empList();
            this.props.closePopup();
        })
        .catch((error) => {
            console.error("Error:", error);
        });  
    }

    render(){
        return(
            <div className="popup">
                <div className='popup_inner'>  
                <button className="btn btn-primary" onClick={this.OnDelete}>Delete</button>
                    <button className="btn btn-primary" onClick={this.props.closePopup}>Cancel</button>
                </div>
            </div>
        );
    }
}
export default DeleteEmployeePopup;