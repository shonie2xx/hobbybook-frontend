import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import { Form, Button } from 'react-bootstrap';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });


    return valid;
};

class RegisterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            firstName: "",
            lastName: "",
            email: "",
            age: "",
            gender: "",
            hasLoginFailed: false,
            showSuccessMsg: false,
            formErrors: {
                username: "",
                password: "",
                confirm_password: "",
                firstName: "",
                lastName: "",
                email: "",
                age: "",
                gender: ""
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
       
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "confirm_password":
                formErrors.confirm_password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "username":
                formErrors.username =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "age":
                formErrors.password =
                    value.length < 2 ? "minimum 2 characaters required" : "";
                break;
            case "gender":
                formErrors.gender =
                    value.length < 2 ? "Please pick gender" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value })//, () => console.log(this.state));
    };

    handleSubmit(event) {
        event.preventDefault();
        const { username, firstName, lastName, email, password, age, gender } = this.state;
        if (formValid(this.state)) {
            if (this.state.age > 18) {
                if (this.state.password === this.state.confirm_password) {

                    AuthenticationService.signup(username, firstName, lastName, email, password, age, gender)
                        .then((res) => {
                            console.log(res.status)
                            if (res.status === 200) {

                                this.props.history.push('/signin');
                                //AuthenticationService.success(username, res.data.accessToken);
                                console.log('you created a user');
                            }
                        }).catch(() => {
                            this.setState({ showSuccessMsg: true })
                            this.setState({ hasLoginFailed: false })
                        })
                }
                else { alert("Password doesn't match"); }
            }
            else { alert("Minimum 18 years old"); }
        }
        else { console.error("FORM INVALID"); }
    }


    render() {
        const { formErrors } = this.state;
        return (

            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange} />
                    {formErrors.username.length > 0 && (
                        <span>{formErrors.username}</span>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    {formErrors.password.length > 0 && (
                        <span>{formErrors.password}</span>
                    )}

                </Form.Group>
                <Form.Group controlId="formBasicCPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} />
                    {formErrors.confirm_password.length > 0 && (
                        <span>{formErrors.confirm_password}</span>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                    {formErrors.email.length > 0 && (
                        <span>{formErrors.email}</span>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" placeholder="First name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                    {formErrors.firstName.length > 0 && (
                        <span>{formErrors.firstName}</span>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" placeholder="Family name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                    {formErrors.lastName.length > 0 && (
                        <span>{formErrors.lastName}</span>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" placeholder="Age" name="age" value={this.state.asge} onChange={this.handleChange} />
                    {formErrors.age.length > 0 && (
                        <span>{formErrors.age}</span>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <div onChange={this.handleChange}>
                        <input type="radio" value="MALE" name="gender" /> Male
                             <input type="radio" value="FEMALE" name="gender" /> Female
                      </div>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Register
                    </Button>

                {/* {this.state.hasLoginFailed && <div>Invalid Credentials</div>} */}
            </Form>

        )
    }
}

export default RegisterComponent;