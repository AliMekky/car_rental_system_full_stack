import React from "react";
import "./Navbar.css";

function Navbar(props) {
  return (
    <div class="navbar">
      <a a href="/" class="logo">
        GO CAR.
      </a>
      {props.show  && (
      <span class="buttons">
        <span>{props.name}'s account!</span>
        {props.isLogged ? (
          <a class="login btn btn-primary" onClick={props.end} role="button">
            LOGOUT
          </a>
        ) : (
          <div>
            <a class="login btn btn-primary" href="/Login" role="button">
              LOGIN
            </a>
            <a class="signup btn btn-primary" href="/Signup" role="button">
              SIGN UP
            </a>
          </div>
        )}
      </span>
      )}
    </div>
  );
}

export default Navbar;
