import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import HobbyServices from '../services/HobbyServices';

class ListHobbies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hobbies: []
        }
        this.addHobby = this.addHobby.bind(this);
        this.editHobby = this.editHobby.bind(this);
        this.deliteHobby = this.deliteHobby.bind(this);
    }
    
    componentDidMount(){
        let username = AuthenticationService.getLoggedInUserName();
        HobbyServices.getHobbies(username)
        .then((response) => {
                this.setState({ hobbies: response.data});
            });
    }
    

    addHobby() {
        this.props.history.push('/addhobby');
    }

    editHobby(id) {
        this.props.history.push(`/updatehobby/${id}`);
    }

    deliteHobby(id) {
        HobbyServices.deleteHobby(id).then(res => {
            this.setState({ hobbies: this.state.hobbies.filter(hobbies => hobbies.id !== id) });
        });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Hobbies</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addHobby}>Add Hobby</button>
                </div>

                <div className="row">
                    <table className="table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.hobbies.map(
                                    hobbies=>
                                        <tr key={hobbies.id}>
                                            <td>{hobbies.name}</td>
                                            <td>{hobbies.description}</td>
                                            <td>
                                                <button onClick={() => this.editHobby(hobbies.id)} className="btn btn-info">Update</button>
                                                <button onClick={() => this.deliteHobby(hobbies.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default ListHobbies;
