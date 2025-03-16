import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UnAuthenticated } from "../../components/common/UnAuthenticated";
import { UserContext } from "../../context/User/UserContext";

export const UserDashboard = () => {
  const userContext = useContext(UserContext);
  const dashboardView = () => {
    return <Outlet />;
  };

  return (
    <>
      {userContext.isLogin ? (
        <>{dashboardView()}</>
      ) : (
        <>
          <UnAuthenticated />
        </>
      )}
    </>
  );
};
