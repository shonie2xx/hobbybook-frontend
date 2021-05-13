import React, { Component } from 'react';
import { Card, Button,  Modal } from "react-bootstrap";
import AccountsServices from '../services/AccountsServices';
import AuthenticationService from '../services/AuthenticationService';
import HobbyServices from '../services/HobbyServices';

class UserCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            hobbies: []
        }

        this.like = this.like.bind(this);
        this.pass = this.pass.bind(this);

    }
    componentDidMount() {
        HobbyServices.getHobbies(this.props.user.username).then((res) => {
            this.setState({ hobbies: res.data });
        });
    }

    handleModal() {
        this.setState({ show: !this.state.show })
    }

    like(toUserId) {
        let fromUserId = AuthenticationService.getLoggedInUserId();
        if (fromUserId != null) {
            AccountsServices.like(fromUserId, toUserId)
            window.location.reload()
        }
        else { console.log("no from userId"); }
    }

    pass(toUserId) {
        let fromUserId = AuthenticationService.getLoggedInUserId();
        if (fromUserId != null) {
            AccountsServices.pass(fromUserId, toUserId)
            window.location.reload()
        }
        else { console.log("no from userId"); }
    }

    render() {
        let { id, firstName,lastName, age, gender } = this.props.user;
        return (

            <Card>

                {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}

                <Card.Body key={id}>
                    <Card.Title>{firstName}</Card.Title>
                    <Card.Text>{lastName} </Card.Text>
                    <Card.Text>{age} </Card.Text>
                    <Card.Text>{gender} </Card.Text>

                    <Button className="btn btn-info" onClick={() => this.like(id)}>Like</Button>
                    <Button className="btn btn-danger" onClick={() => this.pass(id)}>Pass</Button>
                    <Button variant="btn btn-secondary" onClick={() => this.handleModal()}>See hobbies</Button>
                </Card.Body>

                <Modal show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title>Hobby</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <table className="table table-stripped table-bordered">
                        <tbody>
                        {this.state.hobbies.map(
                            hobbies =>
                                <tr key={hobbies.id}>
                                    <td>{hobbies.name}</td>
                                    <td>{hobbies.description}</td>
                                </tr>
                        )}
                        </tbody>
                        </table>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModal()}>
                            Close
                         </Button>
                    </Modal.Footer>
                </Modal>
            </Card>

        )

    }
}

export default UserCard;