// a reducer is just a function and it takes in two things: the state, and action

// our types
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER
} from '../types';

// state is immutable, we can't just reassign it, so we basically have to make a copy of and then add any addition or changes to it.
//  the way we can copy it, is with the spread operator like : '...state'
export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload, // the users is gonnna be filled with the payload that was done in GithubState
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
