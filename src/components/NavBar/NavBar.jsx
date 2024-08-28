import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Book List</Link>
            </li>
            <li>
              <Link to="/books/new">New Book</Link>
            </li>
            <li>
              <Link to="/libraries">Library List</Link>
            </li>
            <li>
              <Link to="/libraries/new">Build Library</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
