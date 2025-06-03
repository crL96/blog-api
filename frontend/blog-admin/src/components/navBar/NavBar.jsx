import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { useState, useEffect } from "react";

function NavBar() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [])

  function handleLogout() {
    sessionStorage.removeItem("token");
  }

  return (
    <nav className={styles.navBar}>
        <ul>
          {signedIn ? ( // If user is signed in
            <>
              <li>
                <Link to="/">Blog Posts</Link>
              </li>
              <li>
                <Link to="/newpost">New Post</Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout}>Log Out</Link>
              </li>
            </>
          ) : ( // If user is not signed in
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
    </nav>
  );
};

export default NavBar;