import React, { Fragment } from 'react';
import spinner from './spinner.gif';

// this is an arrow functional component
const Spinner = () => (
  // since we dont have any other js here we can remove the return(); that the fragment was in
  // because of the arrow function
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);

export default Spinner;
