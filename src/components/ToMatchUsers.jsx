import React, { Component } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import AuthenticationService from '../services/AuthenticationService';
import AccountsServices from '../services/AccountsServices';
import Usercard from './UserCard';


class ToMatchUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: [],
            hobbies:[]
        }
    }
    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        AccountsServices.findAvailableAccounts(username).then((res) => {
            this.setState({ accounts: res.data });
        });
        
    }
    render() {
       
        let userCards = this.state.accounts.map(user => {
            return (
                <Col sm="4">
                    <Usercard key={user.id} user={user} />
                </Col>
            )
        })
        
        return (
            <Container fluid>
                <Row>
                    {userCards}
                </Row>
            </Container>
        )
    }
}
    export default ToMatchUsers;

