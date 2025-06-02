import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
        <ul>
          <li>
            <Link to="/">Blog Posts</Link>
            <Link to="login">Log In</Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBar;