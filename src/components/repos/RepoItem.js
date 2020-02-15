import React from 'react';
import PropTypes from 'prop-types';

// it is passed in a single repo ad the prop, and since it is a prop we add import PropTypes
// we also add propTypes below

const RepoItem = ({ repo }) => {
  return (
    <div className='card'>
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
