import React, { Component } from 'react';
import AccountsServices from '../services/AccountsServices';
import AuthenticationService from '../services/AuthenticationService';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: []
        }
        this.editUser = this.editUser.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem('role') === "ROLE_ADMIN") {
            let username = AuthenticationService.getLoggedInUserName();
            AccountsServices.findAllAccounts(username).then((res) => {
                this.setState({ accounts: res.data });
            });
        }
        else {
            alert("Only admin has priviligies");
        }
    }

    editUser(id) {
        this.props.history.push(`/edituser/${id}`);
    }

    deliteAccount(id) {
        AccountsServices.deliteUser(id).then(res => {
            this.setState({ accounts: this.state.accounts.filter(accounts => accounts.id !== id) });
        });

    }


    render() {
        return (
            <div>

                <h2 className="text-center">Users</h2>
                <div className="row">
                    <table className="table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.accounts.map(
                                    accounts =>
                                        <tr key={accounts.id}>
                                            <td>{accounts.id}</td>
                                            <td>{accounts.username}</td>
                                            <td>{accounts.firstName}</td>
                                            <td>{accounts.lastName}</td>
                                            <td>{accounts.age}</td>
                                            <td>{accounts.email}</td>
                                            <td>{accounts.gender}</td>
                                            <td>
                                                <button onClick={() => this.editUser(accounts.id)} className="btn btn-info">Edit</button>
                                                <button onClick={() => this.deliteAccount(accounts.id)} className="btn btn-danger">Delete</button>
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

export default Admin;
