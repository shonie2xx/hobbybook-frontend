import React, { Component } from 'react';
import AccountsServices from '../services/AccountsServices';

class EditUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            email: '',
            firstName: '',
            lastName: ''
        }
        
        this.editUser = this.editUser.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        AccountsServices.findById(this.state.id).then((res) => {
            let user = res.data;
            console.log(user);
            this.setState({
               username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName
            });
        });
    }

    editUser = (e) => {
        e.preventDefault();
        let user = {
            username: this.state.username, email: this.state.email, firstName: this.state.firstName,
            lastName: this.state.lastName
           
        };

        console.log('user => ' + JSON.stringify(user));

        AccountsServices.editUser(this.state.id, user).then(res => {
            this.props.history.push('/admin');
        });
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    cancel() {
        this.props.history.push('/admin');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="car col-md-6 offset-md-3 offset-md-3">
                            <h3 classname="text-center">Edit user</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Username: </label>
                                        <input placeholder="Username" name="username" className="form-control"
                                            value={this.state.username} onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Email: </label>
                                        <input placeholder="Email" name="email" className="form-control"
                                            value={this.state.email} onChange={this.handleChange} />

                                    </div>

                                    <div className="form-group">
                                        <label>First Name: </label>
                                        <input placeholder="firstName" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name: </label>
                                        <input placeholder="Lastname" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.handleChange} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.editUser}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;