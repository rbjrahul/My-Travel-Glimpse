import React, { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

function NavLinks(props) {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">New Place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && <button onClick={auth.logout}>logout</button>}
    </ul>
  );
}
export default NavLinks;
