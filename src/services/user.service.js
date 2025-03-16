import { publicAxios } from "./axios.service";
import { ADD_USER, LOGIN_AUTHENTICATION } from "./helper.service";

// user related service
export const registerUser = (userData) => {
  return publicAxios.post(ADD_USER, userData);
};

//LOGIN USER / ADMIN TOKEN - GENERATION
export const generateTokenAndDoLogin = (loginData) => {
  return publicAxios.post(LOGIN_AUTHENTICATION, loginData);
};
