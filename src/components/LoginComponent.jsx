import React, { Component } from "react";
import AuthenticationService from '../services/AuthenticationService';
import { Form, Button } from 'react-bootstrap';


class LoginComponent extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = {
            username:"",
            password:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      handleSubmit(event) {
        const { username, password } = this.state;
        AuthenticationService.signin(username,password).then((res)=>{
            if(res.status === 200)
            {
                 this.props.history.push('/users');
                 AuthenticationService.success(res.data.username,res.data.accessToken,res.data.id,res.data.roles);
                
            }
        }).catch(() => {
            this.setState({ showSuccessMsg: false })
            this.setState({ hasLoginFailed: true }) 
        })
        event.preventDefault();
      }
      render() {
        return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}> Login </Button>
                    {this.state.hasLoginFailed && <div>Invalid Credentials</div>}

                </Form>
        );
    }

}
export default LoginComponent;