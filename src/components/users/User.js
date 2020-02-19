import React, { Fragment, useEffect, useContext } from 'react'; // import componenet, fragments, hooks, etc. here !
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  // because we are using hooks we can't use componentDidMount bc it is a lifecycle method that can only be used in a class
  // to overcome this, we use 'useEffect'
  // componentDidMount() { // the way we did it before with a class
  //   this.props.getUser(match.params.login);
  //   this.props.getUserRepos(match.params.login);
  // }

  const githubContext = useContext(GithubContext);

  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  // with useEffect, you pass in  an arrow function, and you dont want to necessarily return anything directly,
  // you wanna open up the curly braces and place the method inside
  // useEffect constantly runs in a loop, we can stop that by adding an empty set of brackets
  useEffect(() => {
    getUser(match.params.login); // we dont need 'this.props' anymore because we are bringing in the props directly now
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);
  // the eslint line removed the warning in the console

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
  } = user;

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
};

export default User;
