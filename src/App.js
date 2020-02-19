import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Alert from './components/layout/Alert';

// in the following line we are bringing in our github state and alert state
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

// turning the app class into a function
const App = () => {
  return (
    // here is the provider wrapping around our entire application
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
