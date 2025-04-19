import { Button, Card, Col, Container, Row } from "react-bootstrap";
import image from "../../asserts/IMG_9190.JPG";
export const CategoryView = ({ categoriesData, handleCategoryDelete }) => {
  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  return (
    <Card className="mb-2 border shadow">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={2} className="text-center">
            <img
              src={
                categoriesData?.categoryCoverImage != null &&
                categoriesData?.categoryCoverImage !== ""
                  ? categoriesData?.categoryCoverImage
                  : image
              }
              style={imageStyle}
              className="rounded-circle"
            />
          </Col>
          <Col md={8}>
            <h5>{categoriesData?.categoryTitle}</h5>
            <p>{categoriesData?.categoryDescription}</p>
          </Col>
          <Col md={2}>
            <Container className="d-grid gap-2">
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleCategoryDelete(categoriesData?.categoryId)}
                disabled={categoriesData?.products.length !== 0}
              >
                Delete
              </Button>
              <Button size="sm" variant="success">
                View
              </Button>
              <Button size="sm" variant="primary">
                Edit
              </Button>
            </Container>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
