import axios from "axios";
import { BASE_URL } from "./helper.service";
import { getTokenFromLocalStorage } from "../auth/HelperAuth";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

// add the authorization
privateAxios.interceptors.request.use((config) => {
  console.log(config);

  // get the token
  const token = getTokenFromLocalStorage();
  // if token is not empty then add it in the header
  if (token) {
    console.log("token is not empty");
    config.headers["Authorization"] = `Bearer ${token}`;
    console.log("after editing the config", config);
  }
  return config;
});
