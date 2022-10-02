import http from "../http-common";

const register = (formField) => {
  return http.post("/register", formField);
};



const AuthService = {
  register,
};

export default AuthService;
