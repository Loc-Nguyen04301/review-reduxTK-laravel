import React from "react";
import "./Login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAuth } from "../slices/auth";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(loginAuth(values)).then((res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res.payload.user));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.payload.access_token)
          );
          navigate("/reviews");
        });
      }}
    >
      {(props) => (
        <div className="login-page" onSubmit={props.handleSubmit}>
          <div className="form">
            <form className="login-form">
              <input
                className="my-2"
                type="text"
                placeholder="email"
                name="email"
                onChange={props.handleChange}
                values={props.values.email}
              />
              {props.errors.email && (
                <div className="text-danger">{props.errors.email}</div>
              )}
              <input
                className="my-2"
                type="password"
                placeholder="password"
                name="password"
                onChange={props.handleChange}
                values={props.values.password}
              />
              {props.errors.password && (
                <div className="text-danger">{props.errors.password}</div>
              )}
              <button type="submit">login</button>

              <p className="message">
                Not registered? <Link to="/register"> Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
