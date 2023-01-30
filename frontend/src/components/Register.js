import React from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";

const Login = () => {

  const notify = () =>
    toast.success("Register Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters"),
  });


  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
        if (values.password === values.confirm_password) {
           AuthService.register(values)
            .then(() => {
              notify();
            })
        } else {
          alert("Password not matched Confirm Password");
        }
      }}
    >
      {(props) => (
        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={props.handleSubmit}>
              <input
                className="my-2"
                type="text"
                placeholder="name"
                name="name"
                onChange={props.handleChange}
                values={props.values.name}
              />
              {props.errors.name && (
                <div className="text-danger">{props.errors.name}</div>
              )}

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

              <input
                className="my-2"
                type="password"
                placeholder="confirm password"
                name="confirm_password"
                onChange={props.handleChange}
                values={props.values.confirm_password}
              />
              {props.errors.confirm_password && (
                <div className="text-danger">
                  {props.errors.confirm_password}
                </div>
              )}

              <button type="submit">Register</button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <p className="message">
                Have account?
                <Link to="/login"> Signin Here</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
