import { Button, Container, Modal } from "react-bootstrap";
import image from "../../asserts/IMG_9190.JPG";
export const ViewCategoryModal = ({
  showCategoryView,
  handleCloseCategoryView,
  currentCategory,
}) => {
  const imageStyle = {
    width: "100px",
    height: "250px",
    objectFit: "contain",
  };
  return (
    <>
      <Modal
        show={showCategoryView}
        onHide={handleCloseCategoryView}
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>{currentCategory?.categoryTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <img
              src={
                currentCategory?.categoryCoverImage != null &&
                currentCategory?.categoryCoverImage !== ""
                  ? currentCategory?.categoryCoverImage
                  : image
              }
              style={imageStyle}
            />
          </Container>
          {currentCategory?.categoryDescription}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCategoryView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
