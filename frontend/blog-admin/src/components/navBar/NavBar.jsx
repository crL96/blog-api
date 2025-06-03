import { Link } from "react-router-dom";
import styles from "./navBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navBar}>
        <ul>
          <li>
            <Link to="/">Blog Posts</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/newpost">New post</Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBar;