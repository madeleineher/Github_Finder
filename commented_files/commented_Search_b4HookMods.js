import React, { Component } from 'react';
// importing searchUsers as a proptype
import PropTypes from 'prop-types';

// usually when we have a form in react we are going to want to attach state
// to the input.

// on the first addition of state and value to the render lifecycle,
// we won't be able to type anything because we need an onChange function
// because it needs to fire-off and it needs to update the state because the input is attached the state
export class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    // this is a prop types function, makes the code more robust
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      // searchUsers() is a function and it is being called onSubmit and we are calling a prop, and a function in the prop is called
      // searchUsers() and then we are passing in the text
      this.props.searchUsers(this.state.text);
      // setting our local search text to nothing
      this.setState({ text: '' });
    }
  };

  // an arrow function that takes in an event and sets the state of the text
  //   !!! if we had several input fields, we wouldn't want to have different onchange functions
  //       we could use '[]' instead of 'text' with the name of the allowed input like e.target.name
  onChange = e => this.setState({ text: e.target.value });

  render() {
    // some destructuring here to pull out the props
    const { showClear, clearUsers } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange} // this is needed for changing the state of the input given
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {/* when we're calling the props clearUsers, we are sending it up to app.js where it will be catch in the <Search/> component */}
        {/* this is an expression that is wrapped around the button, if the prop 'showClear' is true (we use the double &&) then we show the button*/}
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
