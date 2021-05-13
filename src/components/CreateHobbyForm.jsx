import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import HobbyServices from '../services/HobbyServices';

class CreateHobbyForm extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            hbbname:'',
            description:''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.saveHobby = this.saveHobby.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    
    saveHobby = (e) => {
        let username = AuthenticationService.getLoggedInUserName();
        e.preventDefault();
        let hobby = {name:this.state.hbbname, description:this.state.description};
        console.log('hobby => ' + JSON.stringify(hobby));
        
        HobbyServices.createHobby(username,hobby).then(res=>{
                this.props.history.push('/hobbies');
        });
    }

    changenameHandler=(event) => {    
        this.setState({hbbname: event.target.value});
    }
    changedescriptionHandler=(event) => {    
        this.setState({description: event.target.value});
    }
    cancel(){
        this.props.history.push('/hobbies');
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className = "car col-md-6 offset-md-3 offset-md-3">
                            <h3 className ="text-center">Add Hobby</h3>
                            <div className = "card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Hobby name: </label>
                                        <input placeholder="Name" name="hbbname" className="form-control"
                                                value={this.state.hbbname} onChange={this.changenameHandler}/>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label>Description: </label>
                                        <input placeholder="Description" name="description" className="form-control"
                                                value={this.state.description} onChange={this.changedescriptionHandler}/>
                
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveHobby}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateHobbyForm;