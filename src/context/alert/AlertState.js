import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

// now we want to create out initial state
const AlertState = props => {
  // since we only have one state we are just going to set it to null, a single object
  const initialState = null;

  //  in order to dispatch to our reducer, we need useReducer
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type) => {
    // this.setState({ alert: { msg, type } });
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  // clear alert button here
  const clearAlert = alert => dispatch({ type: REMOVE_ALERT });

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
        clearAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
