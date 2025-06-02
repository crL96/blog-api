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
            <Link to="login">Log In</Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBar;