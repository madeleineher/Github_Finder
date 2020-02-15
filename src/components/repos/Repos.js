import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

// function component
// gets passed in props, where we are destructuring and pulling out the repos
const Repos = ({ repos }) => {
  // for the return we are looping though the repos with map() for each one we call it repo,
  // and then we want to display a repo item component where we pass in the individual repo item component
  // and it is going to NEED a KEY because it is a list
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
  //   this is RepoItem
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;
