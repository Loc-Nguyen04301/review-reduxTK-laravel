import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const user = localStorage.getItem("user");
  const userName = JSON.parse(user); 
  // const accessToken = useSelector((state) => state.auth.accessToken);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark d-flex flex-row justify-content-between">
      <a href="/" className="navbar-brand">
        REVIEW-APPLICATION
      </a>
      <div className="card-body">
        {user && (
          <div className="text-light text-end me-3">Hi, {userName.name}</div>
        )}
      </div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
