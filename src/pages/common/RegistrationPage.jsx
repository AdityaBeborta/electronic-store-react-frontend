import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { use, useState } from "react";
import { toast } from "react-toastify";

import { Base } from "../../components/common/Base";
import { registerUser } from "../../services/user.service";

export const RegistrationPage = () => {
  //create a state to show loader
  const [loading, setLoading] = useState(false);
  //create a useState for holding registration data
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
  });
  //create a event handler
  const handleRegDataChange = (event) => {
    const { name, value } = event.target;
    setRegData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //errors
  const [errorData, setErrorData] = useState({
    isErrorExist: false,
    errorData: null,
  });
  //submit handler
  const handleRegSubmit = (event) => {
    // prevent the form from submitting
    event.preventDefault();

    // do validations
    if (regData.password != regData.confirmPassword) {
      toast.error("entered password is not matching with the confirm password");
      return;
    }
    //set loader == true
    setLoading(true);

    // call the backend api and submit the form
    registerUser(regData)
      .then((res) => {
        toast.success("Registration is successfull");
        handleResetButton();
      })
      .catch((error) => {
        if (error.status == 409) {
          toast.warning(error.response.data.message);
          return;
        }

        toast.error("something went wrong");
        setErrorData({
          isErrorExist: true,
          errorData: error?.response?.data,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleResetButton = () => {
    setRegData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      about: "",
    });
  };
  //JSX component
  const Registration = () => {
    return (
      <Container>
        {/* Row is having 12 Grids */}
        <Row>
          {/* means we are saying that we are going to use 8 grids but leave 2 from left and 2 from right so that it will be in center */}
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="my-2 shadow border-0 p-4"
              style={{
                position: "relative",
                top: -60,
              }}
            >
              <Card.Body>
                <h3 className="text-center">
                  Please register to kick start your Journey with us!
                </h3>
                <Form onSubmit={handleRegSubmit}>
                  {/* name filed */}
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Please enter your name"
                      name="name"
                      value={regData.name}
                      onChange={handleRegDataChange}
                      isInvalid={errorData?.errorData?.name}
                    />
                    {/* for showing error message */}
                    <Form.Control.Feedback type="invalid">
                      {errorData?.errorData?.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* email field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={regData.email}
                      onChange={handleRegDataChange}
                      placeholder="Please enter your email"
                      isInvalid={errorData?.errorData?.email}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                    {/* for showing error message */}
                    <Form.Control.Feedback type="invalid">
                      {errorData?.errorData?.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* password field */}
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      value={regData.password}
                      onChange={handleRegDataChange}
                      type="password"
                      placeholder="please enter your password"
                      isInvalid={errorData?.errorData?.password}
                    />
                    {/* for showing error message */}
                    <Form.Control.Feedback type="invalid">
                      {errorData?.errorData?.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* confirm password */}
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={regData.confirmPassword}
                      onChange={handleRegDataChange}
                      placeholder="please re-enter your password"
                    />
                  </Form.Group>
                  {/* Gender field */}
                  <Form.Group>
                    <Form.Label>Select Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="male"
                        name="gender"
                        type={"radio"}
                        id={"male"}
                        value="male"
                        checked={regData.gender === "male"}
                        onChange={handleRegDataChange}
                        isInvalid={errorData?.errorData?.gender}
                      />
                      <Form.Check
                        inline
                        label="female"
                        name="gender"
                        type={"radio"}
                        value="female"
                        checked={regData.gender === "female"}
                        onChange={handleRegDataChange}
                        isInvalid={errorData?.errorData?.gender}
                        id={"female"}
                      />
                    </div>
                    {/* for showing error message */}
                    <Form.Control.Feedback type="invalid">
                      {errorData?.errorData?.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* about field */}
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="please tell us something about you"
                    >
                      <Form.Control
                        as="textarea"
                        name="about"
                        value={regData.about}
                        onChange={handleRegDataChange}
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                        isInvalid={errorData?.errorData?.about}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errorData?.errorData?.about}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    {/* for showing error message */}
                  </Form.Group>
                  {/* button submit */}
                  <Container className="text-center mt-3">
                    <p>
                      Already have an account ? please <a href="#">login</a>{" "}
                      here!
                    </p>
                    <Button type="submit" variant="success">
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "submit"
                      )}
                    </Button>
                    <Button
                      onClick={handleResetButton}
                      className="ms-2"
                      variant="warning"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <Base>{Registration()}</Base>;
};
