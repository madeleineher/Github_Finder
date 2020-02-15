import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// this is a class-based component that won't have any state but will have a lifecycle method
// we need to use component did mount to fire off that getUser function we created in App.js
export class User extends Component {
  // so that this fires off once this component is loaded
  componentDidMount() {
    // the way that we can pull it from the URL is from the within the prop passed to the method getUser
    // the param '.login' is gotten from the path given in app.js
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
  };

  render() {
    //   pulling out all of the data we want form this.prop.user
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      company,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading, repos } = this.props;

    //  if loading is true then let's return a spinner
    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt=''
              className='round-img'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location} </p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>

              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>

              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Publc Repos: {public_repos}</div>
          <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

export default User;
