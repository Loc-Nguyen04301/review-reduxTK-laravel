import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   axios.post("http://localhost:8000/api/me").then((response) => {
  //     setUser(response.data.user);
  //   });
  // }, []);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark d-flex flex-row justify-content-between">
      <a href="/" className="navbar-brand">
        REVIEW-APPLICATION
      </a>
      <div className="card-body">{user && <div>Hi {user.name}</div>}</div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to={"/login"} style={{ color: "white" }}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
