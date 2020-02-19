import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

// now we are passing in our props through the function parameters , also no need for destructuring
const Search = () => {
  // no longer need to pass in searchUsers as a prop bc of context

  // here we are initializing the githubContext, useContext is a hook that we import in
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  // we can no longer do this, as in bring in state since it is a function based component,
  // NOW we bring in useState hook from 'react' like in line 1.
  // state = {
  //   text: ''
  // };

  // now we need to define our state since we are no longer working with a class, the way we bring it in is through destructuring
  // this is transformed from the above state on line 8.
  // within the bracket we pull out our state, in this case text, and then we create a method to change the state, which is setState
  // /!\ it is good to use 'set' followed by the name of the state, GOOD PRACTICE
  // then we make it equal to useState (the hook) and we set it equal to the default value and for us in this case it is empty.
  const [text, setText] = useState(''); // the TEXT state

  // this is now a function within a function bc we are no longer working with a class but with a functional component
  const onSubmit = e => {
    e.preventDefault();
    // no longer need this.state here anymore here as well
    if (text === '') {
      // now we pass in setAlert as a prop to the functional component and remove 'this.props' bc we are working with a functional component
      alertContext.setAlert('Please enter something', 'light');
    } else {
      // just need text here, again, no need for 'this.state'
      githubContext.searchUsers(text); // this is now part of the github context so we precede it with 'githubContext.'
      // we dont use setState here anymore, we just use setText bc of the hook we implemented & no need for 'this.' that preceded the set function
      // we also no longer need the object like ({ text: ''}), we just leave the () as is
      setText('');
    }
  };
  // this is now also a function
  // const onChange = e => this.setState({ text: e.target.value });
  // we no longer change the state with setState ^, like above, now we call setText()!
  const onChange = e => setText(e.target.value);
  // we also no longer need to pass in the object {} but we just make it equal to the new value (or text that was passed in)

  // no longer need a render bc it is a function, we now only need a return
  // render() {
  // const { showClear, clearUsers } = this.props; // props no longer come in like this but through the parameter of the function

  return (
    // we no longer need 'this.' here because we are no longer working with classes
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          // now bc we are using hooks, we no longer need 'this.stat.text' we just need to use 'text'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
