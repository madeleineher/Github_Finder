import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
import axios from 'axios'; // need to import packages here also
import Search from './components/users/Search';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: true
  };
  // another lifecycle method that will run when the component mounts,
  // i.e. when the components loads
  async componentDidMount() {
    // how to change the state
    this.setState({ loading: true });
    // axios deals with promises **** LOOK UP 'js promises'
    // this is the '.' THEN syntax
    // axios
    //   .get('https://api.github.com/users')
    //   .then(res => console.log(res.data));

    // adding 'async' is part of the async-await syntax
    // then we create a const 'res' variable and adding 'await'
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // after getting the data we want to reset the state
    // setting users equal to the data we get from the server
    // and resetting loading to false now that we the data
    this.setState({ users: res.data, loading: false });
  }

  //  render is a life-cycle method and it is one that is required
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search />
          {/* passing in loading and user from our state, and we are passing them in as props  */}
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
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
