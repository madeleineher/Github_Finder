import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
import axios from 'axios'; // need to import packages here also
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  // // SEARCH GITHUB USERD
  // takes in text from the prop being sent up as 'this.state.text'
  // since this is an arrow function we add the async before the parameter of the arrow function
  searchUsers = async text => {
    this.setState({ loading: true });
    // with this endpoint the data is going to be in res.data.items
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  // // Clear users from state
  // no request needed, just clearing the state, making users equal an empty array and setting loading to false
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    //  setting the state of alert, and then set the alert to an object that gets msg and type -- setting the alert
    this.setState({ alert: { msg, type } });
    //  ^ this wont display anything, instead it will change the state of alert

    // setting a timeout for the alert of 5sec
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  // trying to add clear button here
  clearAlert = alert => this.setState({ alert: null });

  //  render is a life-cycle method and it is one that is required
  render() {
    // destructuring here to make code cleaner, we are pulling out users and loading so no need for this.state before them in the return anymore
    const { users, loading } = this.state;

    return (
      // when using a router we need to wrap our root div within router tags
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            {/* in this case 'alert' is passed in as a prop of whatever the alert is in the state */}
            <Alert alert={this.state.alert} clearAlert={this.clearAlert} />
            <Switch>
              {/* first route */}
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    {/* here we are sending a prop up from search.js, sending things up and down is referred to as prop drilling, redux remedy this */}
                    {/* now we are sending another prop with clearUsers and making it equal to a method that is 'this.clearUsers' */}
                    {/* the last prop search recieves is a conditional prop based on the length of how many users there are */}
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    {/* passing in loading and user from our state, and we are passing them in as props  */}
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              ></Route>
              {/* second route to about page, since it is just a single component we just have to use component="" */}
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

// NOTES :
// you can't just change states like : this.state.loading = false in react
// you can initialize them ofc, but to change state you must
//  with class-based components you have to use ' this.setState()'
// and within the setState you can pass in an object witht the part of the
// state that we want to change
