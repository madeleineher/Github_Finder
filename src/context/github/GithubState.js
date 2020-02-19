import React, { useReducer } from 'react';
// we're gonna be making request from here, so we are going to need Axios
// because of this, we are no longer going to need to make request from our app-level function anymore
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer.js';
// and now the types that we are going to use
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER
} from '../types';

// now we want to create out initial state
const GithubState = props => {
  // this is our global state for anything that has to do with Github, and similar to what we did originally in the App.js
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  //  in order to dispatch to our reducer, we need to useReducer
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // // these are our actions, and what we want to return here, is the provider
  // search user
  const searchUsers = async text => {
    // now we can just call setLoading, we no longer need to pass a parameter
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // setLoading(false); // we don't need this anymore
    dispatch({
      type: SEARCH_USERS, // we want to have a type
      payload: res.data.items // the payload is the data we want to send, the reducer will send this to any thing that needs it
    });
  };

  // get user
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // get repos
  const getUserRepos = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Clear users from state
  // dispatching a type to the reducer
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // set loading
  //    all we want this to do, it to dispatch to our reducer, and we do that with dispatch that was pulled from the useReducer hook
  //    and what we dispatch in this case is an object, that must have a type and the reducer is going to catch the object
  const setLoading = () => dispatch({ type: SET_LOADING });

  // this is the provider, which we are basically wrapping around our entire program
  // this provider is going to take in a prop which is given to value as an object
  // the point of this is to make these things available to our entire app
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
