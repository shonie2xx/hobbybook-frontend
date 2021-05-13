import React, { Component } from 'react';
import AccountsServices from '../services/AccountsServices';

class UserSettings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            //username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirm_password: ''
        }
        this.saveOptions = this.saveOptions.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let id = sessionStorage.getItem('id');
        AccountsServices.findById(id).then((res) => {
            let user = res.data;
            console.log(user);
            this.setState({
             id:id, username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName
         
            });
        });
    }

    saveOptions = (e) => {
        e.preventDefault();
    
        let user = {
            username: this.state.username, email: this.state.email, firstName: this.state.firstName,
            lastName: this.state.lastName, password: this.state.password
            
        };

        //console.log('user => ' + JSON.stringify(user));
        if (this.state.password === this.state.confirm_password) {
            if (this.state.password !== "") {
                AccountsServices.editUser_Pass(this.state.id, user).then(res => {
                    this.props.history.push('/users');
                });
            }
            else{
                AccountsServices.editUser(this.state.id,user).then(res => {
                    this.props.history.push('/users');
                })
            }
        }
        else {
            alert("Password doesn't match");
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    cancel() {
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="car col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Profile settigns</h3>
                            <div className="card-body">
                                <form>
                                    {/* <div className="form-group">
                                        <label>Username: </label>
                                        <input placeholder="Username" name="username" className="form-control"
                                            value={this.state.username} onChange={this.handleChange} />
                                    </div> */}

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
                                    <div className="form-group">
                                        <label>Password: </label>
                                        <input type="password" placeholder="Password" name="password" className="form-control"
                                            value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm password: </label>
                                        <input type="password" placeholder="Confirm password" name="confirm_password" className="form-control"
                                            value={this.state.confirm_password} onChange={this.handleChange} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOptions}>Save</button>
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

export default UserSettings;