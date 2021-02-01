import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ScribbleContext from "../../context/scribble/scribbleContext";
import SearchBar from "../scribbles/SearchBar";
import OnOffBtn from "../forms/OnOffBtn";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const scribbleContext = useContext(ScribbleContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearScribbles } = scribbleContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearScribbles();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar">
      <h1 style={{ marginLeft: "2rem" }}>
        <Link to="/">
          {/* <i className={icon} /> {title} */}
          <i className={icon} /> {title}
        </Link>
      </h1>
      {/* <div className="flexTop"> */}
      <ul>
        {/* <li>
          <SearchBar />
        </li>
        <li>
          <OnOffBtn darkMode={true} />
        </li> */}
      </ul>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Scribblesave",
  icon: "far fa-sticky-note",
};

export default Navbar;
