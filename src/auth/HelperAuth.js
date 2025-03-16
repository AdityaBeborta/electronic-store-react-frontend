import { ADMIN_USER } from "../services/helper.service";

//save data in local stoarge
export const saveDataInLocalStorage = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

//retrive data from local storage
export const getDataFromLocalStorage = () => {
  let tempLocalStorageData = localStorage.getItem("userData");
  if (tempLocalStorageData != null) {
    return JSON.parse(tempLocalStorageData);
  } else {
    return null;
  }
};

//retrive token from local storage
export const getTokenFromLocalStorage = () => {
  return getDataFromLocalStorage()?.jwtToken;
};

//retrive userdetails from local storage
export const getUserFromLocalStorage = () => {
  return getDataFromLocalStorage()?.user;
};

//check if user is logged in
export const getLoginStatusFromLocalStorage = () => {
  let tempLocalStorageData = localStorage.getItem("userData");
  if (tempLocalStorageData != null) {
    return true;
  } else {
    return false;
  }
};

//check if user is logged in & if logged in check if he is a normal or admin user

export const checkIfUserIsAnAdmin = () => {
  if (getLoginStatusFromLocalStorage()) {
    // user is logged in
    const user = getUserFromLocalStorage();
    const roles = user.roles;
    if (roles.some((currentEle) => currentEle.roleType === ADMIN_USER)) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

//remove data from local storage or we can say like do logout
export const removeDataFromLocalStorage = () => {
  let tempLocalStorageData = localStorage.getItem("userData");
  if (tempLocalStorageData != null) {
    localStorage.removeItem("userData");
  }
};
