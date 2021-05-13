import React, { Component } from 'react';
import HobbyServices from '../services/HobbyServices';

class UpdateHobby extends Component {
    constructor(props)
    {
        super(props)

        this.state ={
            id: this.props.match.params.id,
            hbbname:'',
            description:''
        }
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.updateHobby = this.updateHobby.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    
    componentDidMount(){
        HobbyServices.findHobbyById(this.state.id).then((res) =>{
            let hobby = res.data;
            this.setState({hbbname: hobby.name, description: hobby.description
            });
        });
    }
    
    updateHobby = (e) => {
        e.preventDefault();
        let hobby = {name: this.state.hbbname, description: this.state.description};
        console.log('hobby => ' + JSON.stringify(hobby));
        
        HobbyServices.updateHobby(this.state.id,hobby).then(res => {
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
                            <h3 classname ="text-center">Update Hobby</h3>
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
                                    <button className="btn btn-success" onClick={this.updateHobby}>Save</button>
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


export default UpdateHobby;