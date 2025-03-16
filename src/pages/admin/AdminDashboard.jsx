import { useContext } from "react";
import { Base } from "../../components/common/Base";
import { UserContext } from "../../context/User/UserContext";
import AccessDenied from "../../components/common/AccessDenied";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { SideMenu } from "../../components/admin/SideMenu";

export const AdminDashboard = () => {
  const userContext = useContext(UserContext);
  const dashboardView = () => {
    return (
      <Base hideContainer="true">
        <Container className="p-5">
          <Row>
            <Col
              md={{
                span: 3,
              }}
            >
              <SideMenu />
            </Col>
            <Col md={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </Base>
    );
  };
  return (
    <>
      {userContext.isAdminUser ? (
        <>{dashboardView()}</>
      ) : (
        <>
          <AccessDenied />
        </>
      )}
    </>
  );
};
