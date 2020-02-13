import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//
const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

// use the name of the component for functional components
Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;

// we dont use a-tags in client-side, we use Link from react-router
// instead of using 'href', 'to' is used instead
// whenever using links that go from within the application, use Link from react-router-dom
// beacause an a tag will refresh content
