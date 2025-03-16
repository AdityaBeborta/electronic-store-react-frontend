import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Base } from "../../components/common/Base";
import { useContext, useState } from "react";
import { generateTokenAndDoLogin } from "../../services/user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";
import { ADMIN_USER } from "../../services/helper.service";
import { checkIfUserIsAnAdmin } from "../../auth/HelperAuth";

export const LoginPage = () => {
  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLoginData = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // define role variable
    let roleBasedOnUser = "";
    //set loading -- true
    setLoading(true);
    console.log("form submission triggered");
    console.log("login data ---> ", loginData);
    //call the backend API
    generateTokenAndDoLogin(loginData)
      .then((res) => {
        console.log("promise resolved");
        console.log("response ---> ", res);
        userContext.login(res.data);
        navigate("/users/home");
      })
      .catch((error) => {
        console.log("promise rejected --- error");
        console.log("error ---> ", error);
        if (error.status == 401) {
          toast.error("invalid email or password");
          return;
        }
        toast.error(error?.message);
      })
      .finally(() => {
        console.log("inside finally");
        setLoading(false);
        handleResetButton();
      });
  };

  const handleResetButton = () => {
    console.log("reset handler triggered");
    setLoginData({
      email: "",
      password: "",
    });
  };
  const loginPageJSX = () => {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="my-2 shadow border-0 p-4"
              style={{
                position: "relative",
                top: -60,
              }}
            >
              <Card.Body className="text-center">
                <h4>Please Login here !</h4>
              </Card.Body>
              <Form onSubmit={handleLoginSubmit}>
                {/*email field */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="text"
                    placeholder="please enter your email"
                    value={loginData.email}
                    onChange={handleLoginData}
                    required
                  />
                </Form.Group>
                {/*password field */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="please enter your password"
                    value={loginData.password}
                    required
                    onChange={handleLoginData}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    type="submit"
                    className="btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    onClick={handleResetButton}
                    className="ms-2"
                    type="buttom"
                    variant="warning"
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
        ;
      </Container>
    );
  };
  return <Base>{loginPageJSX()}</Base>;
};
