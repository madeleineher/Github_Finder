import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// this is a functional component with hooks, because it isn't a class
// we do dont use this to access the props, instead we just use and pass in props
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>

      <div>
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          More..
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;

//////// notes :
// state is just a javascript object
// whenever you grab something from 'state' within a class
// you use --> this.state.WHATEVER_U_WANT
// which will give you WHATEVER_U_WANT that was stored
// in the components state and output in the browser

// pulling the values out of the state is called destucturing
// and then you dont need to use this.state.WHATEVER_U_WANT
// you can just use WHATEVER_U_WANT

// converting class-based components to functional bc they longer have state so thy dont need to be classes
// class-based ---> having state
// functional-based ---> stateless
// when you're not using a class, you dont use the 'this' keyword
