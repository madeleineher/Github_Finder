import React, { useState, Fragment } from 'react'; // useState now bc of hooks, we took out components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios'; // need to import packages here also
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
// in the following line we are bringing in our github state
import GithubState from './context/github/GithubState';
import './App.css';

// turning the app class into a function
const App = () => {
  // how to set state within a function, note the 'set' before each keyword
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // because we are no longer using a class we need to add const to all the following methods and now they are functions

  // SEARCH GITHUB USERD

  // Get single Github user, this method takes in the login
  const getUser = async username => {
    setLoading(true);

    // and then sends a request and get that user's info
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(true);
  };

  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Alert
  const showAlert = (msg, type) => {
    // this.setState({ alert: { msg, type } });
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  // trying to add clear button here
  const clearAlert = alert => setAlert(null);

  return (
    // here is the provider wrapping around our entire application
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} clearAlert={clearAlert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      // searchUsers={searchUsers} // we no longer need this because we are passing it through context
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
