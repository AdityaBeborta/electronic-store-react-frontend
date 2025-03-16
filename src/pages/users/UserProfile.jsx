import { useContext } from "react";
import { Base } from "../../components/common/Base";
import { UserProfileView } from "../../components/users/UserProfileView";
import { UserContext } from "../../context/User/UserContext";
import { Col, Row } from "react-bootstrap";

export const UserProfile = () => {
  const userContext = useContext(UserContext);
  return (
    <Base hideContainer="true">
      <Row>
        <Col sm={{ span: 8, offset: 2 }}>
          <UserProfileView user={userContext.userData.user} />
        </Col>
      </Row>
    </Base>
  );
};
