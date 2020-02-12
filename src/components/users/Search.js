import React, { Component } from 'react';

// usually when we have a form in react we are going to want to attach state
// to the input.

// on the first addition of state and value to the render lifecycle,
// we won't be able to type anything because we need an onChange function
// because it needs to fire-off and it needs to update the state because the input is attached the state
export class Search extends Component {
  state = {
    text: ''
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.text);
  };

  // an arrow function that takes in an event and sets the state of the text
  //   !!! if we had several input fields, we wouldn't want to have different onchange functions
  //       we could use '[]' instead of 'text' with the name of the allowed input like e.target.name
  onChange = e => this.setState({ text: e.target.value });

  render() {
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
      </div>
    );
  }
}

export default Search;
