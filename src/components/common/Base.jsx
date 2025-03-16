import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Base = ({
  pageTitle = "welcome to the most trending online electronic store",
  description = "welcome to electronic store",
  children,
  buttonText = "Shop Now",
  buttonColor = "primary",
  buttonEnabled = false,
  buttonLink = "/",
  hideContainer = false,
}) => {
  let styleContainer = {
    height: "200px",
  };
  return (
    <div>
      {/* header */}
   
      {!hideContainer && (
        <Container
          fluid
          className="bg-dark p-5 text-white text-center d-flex justify-content-center"
          style={styleContainer}
        >
          <div>
            <h3>{pageTitle}</h3>
            <p>{description && description}</p>

            {buttonEnabled && (
              <Button as={NavLink} to={buttonLink} varient={buttonColor}>
                {buttonText}
              </Button>
            )}
          </div>
        </Container>
      )}
      {/* body */}
      {children}
      {/* footer */}
      {/* <CustomFooter /> */}
    </div>
  );
};
