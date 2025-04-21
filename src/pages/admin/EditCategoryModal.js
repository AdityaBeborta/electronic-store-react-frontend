import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";

export const EditCategoryModal = ({
  showCategoryEdit,
  handleModalDataResetForCategoryWithClose,
  formData,
  handleFormInpuChange,
}) => {
  const handleCategoryEdit = () => {
    // call the api to edit it
  };

  return (
    <>
      <Modal
        show={showCategoryEdit}
        onHide={handleModalDataResetForCategoryWithClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{formData?.categoryTitle}</Modal.Title>
        </Modal.Header>
        <Card>
          <Card.Body>
            <Form onSubmit={handleCategoryEdit}>
              {/* Category Name */}
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData?.categoryTitle}
                  name="categoryTitle"
                  placeholder="Please enter the category name"
                  onChange={handleFormInpuChange}
                />
              </Form.Group>

              {/* Category Description */}
              <Form.Group>
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  type="text"
                  name="categoryDescription"
                  value={formData?.categoryDescription}
                  placeholder="Please enter the category description"
                  onChange={handleFormInpuChange}
                />
              </Form.Group>
              {/* Image URL */}
              <Container className="py-3 text-center">
              <img
                src={formData?.categoryCoverImage}
                className="img-fluid"
              />
              </Container>
              <Form.Group>
                <Form.Label>Category Image</Form.Label>
                <Form.Control
                  type="text"
                  name="categoryCoverImage"
                  value={formData?.categoryCoverImage}
                  placeholder="Please enter the category image URL"
                  onChange={handleFormInpuChange}
                />
              </Form.Group>
              <div className="text-center mt-2">
                <Button variant="success" type="submit">
                  save changes
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleModalDataResetForCategoryWithClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
