import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLogged();
        const isUserAdmin = AuthenticationService.isUserAdmin();
      

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="http://localhost:3000/" className="navbar-brand" >HobbieBook</a></div>
                        
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            
                             </ul>
                        <ul className="navbar-nav">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/signin">Login</Link></li>}
                            {!isUserLoggedIn && <li><Link className="nav-link" to="/signup">Register</Link></li>}
                            {isUserAdmin && <li><Link className="nav-link" to="/admin">Admin</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/users">Home</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/hobbies">Hobbies</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to = "/matches">Matches</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to = "/usersettings">Settings</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to = "/chat" >LIVE</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to = "/" onClick={AuthenticationService.logout}>Logout</Link></li>}
                            
                            
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;