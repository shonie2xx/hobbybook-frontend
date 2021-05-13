import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import ListAccounts from './components/ListAccounts';
import HeaderComponent from './components/HeaderComponent';
import ListHobbies from './components/ListHobbies';
import AddHobbyForm from './components/CreateHobbyForm';
import UpdateHobby from './components/UpdateHobby';
import LoginComponent from './components/LoginComponent';
import ErrorComponent from './components/ErrorComponent';

import ListMatches from './components/ListMatches';
import WelcomeComponent from './components/WelcomeComponent';
import RegisterComponent from './components/RegisterComponent';
import Logout from './components/Logout';
import ToMatchUsers from './components/ToMatchUsers';
import Admin from './components/Admin';
import EditUser from './components/EditUser';
import UserSettings from './components/UserSettings';
import Chat from './components/Chat';

function App() {
  return (
    <div>
      <Router>
      <HeaderComponent />
        <div className="container">
          <Switch>
            
            <Route path="/signin" component={LoginComponent} />
            <Route path="/signup" component={RegisterComponent} />
          
  
            <Route path="/" exact component={WelcomeComponent}/>
            
            <Route path="/users" component={ToMatchUsers}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/matches" component={ListMatches}/> 

            <Route path="/edituser/:id" component={EditUser}/>
            <Route path="/usersettings" component={UserSettings}/>

            <Route path="/chat" component={Chat}/>

            <Route path="/hobbies" component={ListHobbies}/>
            <Route path="/addhobby" component={AddHobbyForm}/>
            <Route path="/updatehobby/:id" component={UpdateHobby}/>
            
            <Route path="/logout" component={Logout}/> 
            <Route component={ErrorComponent}/>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;
