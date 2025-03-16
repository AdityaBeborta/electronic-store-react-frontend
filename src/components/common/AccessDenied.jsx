import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Base } from "./Base";


 const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Base
      // buttonEnabled='false'
      buttonColor="warning"
      // buttonText="Login"
      pageTitle="🦇 Access Forbidden! You hear whispers from beyond... Leave while you still can...👣🎭"
      description="🚫 STOP! Unauthorized access detected! The darkness is watching... 🌑👁️"
      // buttonLink="/login"
    >
      <Container className="d-flex flex-column align-items-center justify-content-center text-center">
        <div style={{ fontSize: "80px", color: "red" }}>⛔</div>
        <h1 className="mt-4 text-danger">403 - Access Denied</h1>
        <p className="text-muted">
          You don’t have permission to access this page.
        </p>
        <Button variant="success" onClick={() => navigate("/users/home")}>
          Go to Homepage
        </Button>
      </Container>
    </Base>
  );
};

export default AccessDenied;
