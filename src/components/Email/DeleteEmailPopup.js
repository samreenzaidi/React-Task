import React from "react";

class DeleteEmailPopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            idtableEmail: this.props.idtableEmail
        }
    }

    OnDelete = (event) =>{
        event.preventDefault();
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/email/"+this.state.idtableEmail, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(() => {
            this.props.emailList();
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
export default DeleteEmailPopup;