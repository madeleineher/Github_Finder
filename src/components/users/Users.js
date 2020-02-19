import React, { useContext } from 'react'; // bringing in the useContext hook here
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
// bring this in with an uppercase 'G' and initialize it with a lowercase 'g'
import GithubContext from '../../context/github/githubContext';

// we dont need to pass in props anymore because we are pull them from the githubContext
const Users = () => {
  // initializing the github context here, this and the imports will give use access to anything in the GithubContext, this is why we don't need to pass arguments anymore from the App level
  const githubContext = useContext(GithubContext);

  // destructuring from githubContext, instead of adding githubContext to the props below
  const { users, loading } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

// we dont need this anymore because it is no longer coming from props anymore, it is coming from context now
// Users.propTypes = {
//   users: PropTypes.array.isRequired,
//   loading: PropTypes.bool.isRequired
// };

// this is our created variable to our styled object
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;

// map is a high order array method that takes in a function
