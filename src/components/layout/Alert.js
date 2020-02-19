import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

// this is a functional component that that is the alert parameter (which is an object with a message and type)
const Alert = () => {
  // clearAlert
  const alertContext = useContext(AlertContext);

  const { alert, clearAlert } = alertContext;

  return (
    alert !== null && (
      // the alert is based off of the type passed in, which is a prop
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
        <button
          className='btn btn-sm'
          onClick={clearAlert}
          style={{ backgroundColor: 'pink' }}
        >
          x
        </button>
      </div>
    )
  );
};

export default Alert;
