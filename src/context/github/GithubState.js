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
import { deflate } from 'zlib';

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

  // get user

  // get repos

  // clear users

  // set loading

  // this is the provider, which we are basically wrapping around our entire program
  // this provider is going to take in a prop which is given to value as an object
  // the point of this is to make these things available to our entire app
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
