import http from "../http-common";

const register = (values) => {
  return http.post("auth/register", values);
};
const login = (values) => {
  return http.post("auth/login", values);
};


const AuthService = {
    register,
    login
};

export default AuthService;