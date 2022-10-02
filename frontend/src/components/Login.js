import React from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // const { email, password } = values;
        // make request first to sanctum/csrf-cookie
        axios.get("/sanctum/csrf-cookie").then(() => {
          const payload = values;
          axios
            .post("http://localhost:8000/api/login", payload, {
              headers: { Accept: "application/json" },
            })
            .then((response) => {
              console.log(response.data.user);
              if (response.data.user) {
                alert("Login success");
                navigate("/");
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.response) {
                if (error.response.data.message) {
                  alert(error.response.data.message);
                }
                if (error.response.data.errors) {
                  alert(error.response.data.errors);
                }
              }
            });
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
