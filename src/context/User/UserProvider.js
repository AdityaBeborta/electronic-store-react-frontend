import { useEffect, useState } from "react";
import {
  checkIfUserIsAnAdmin,
  getDataFromLocalStorage,
  getLoginStatusFromLocalStorage,
  removeDataFromLocalStorage,
  saveDataInLocalStorage
} from "../../auth/HelperAuth";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  useEffect(() => {
    setIsLogin(getLoginStatusFromLocalStorage());
    setUserData(getDataFromLocalStorage());
    setIsAdminUser(checkIfUserIsAnAdmin());
  }, []);

  const doLogin = (data) => {
    //first of all store the data in the local storage
    saveDataInLocalStorage(data);
    //change the flag for login
    setIsLogin(true);
    //set the user data in the use state
    setUserData(getDataFromLocalStorage());

    setIsAdminUser(checkIfUserIsAnAdmin());
  };

  const doLogout = () => {
    //first of all remove data from local storage
    removeDataFromLocalStorage();
    //set logged in value to false'
    setIsLogin(false);
    //set user data to null
    setUserData(null);
    setIsAdminUser(false);
  };

  return (
    <UserContext.Provider
      value={{
        isAdminUser,
        userData,
        setUserData,
        isLogin,
        setIsLogin,
        login: doLogin,
        logout: doLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
