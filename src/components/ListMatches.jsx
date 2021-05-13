import React, { Component } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import MatchService from '../services/MatchService';
import UserMatchCard from './UserMatchCard';
import { Container, Col, Row } from "react-bootstrap";

class ListMatches extends Component {
    constructor(props){
            super(props)
            this.state = {
                matches: []   
            }
            
    }

    componentDidMount(){
        let username = AuthenticationService.getLoggedInUserName();
        MatchService.getMatches(username).then((response) =>
        {
            this.setState({ matches: response.data});
        });
        console.log(this.state);
    }
    
render() {
       
    let UserMatchCards = this.state.matches.map(user => {
        return (
            <Col sm="4">
                <UserMatchCard key={user.id} user={user} />
            </Col>
        )
    })
    
    return (
        <Container fluid>
            <Row>
                {UserMatchCards}
            </Row>
        </Container>
    )
}
}
export default ListMatches;
