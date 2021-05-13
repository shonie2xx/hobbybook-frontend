import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
class Logout extends Component {
    state = {
        navigate:false
    };

    logout = () =>{
        sessionStorage.clear();
        this.setState({navigate: true});
    };

    render() {
        const{ navigate } = this.state;
        if(navigate) {
            return <Redirect to = "/" push={true} />;
        }
        
        return (
            <Button onClick={this.logout}>Logout</Button>
        );
    }
}

export default Logout;