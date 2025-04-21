import { Spinner } from "react-bootstrap";

export const CustomLoader = ({ message = "" }) => {
  return (
    <>
      <Spinner animation="border" />
      <h4>{message}</h4>
    </>
  );
};
