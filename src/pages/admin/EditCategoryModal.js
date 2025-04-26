import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import { updateCategoryById } from "../../services/categories.service";
import { toast } from "react-toastify";

export const EditCategoryModal = ({
  showCategoryEdit,
  handleModalDataUpdateForCategoryWithClose,
  formData,
  handleFormInpuChange,
}) => {
  const handleCategoryEditFormSubmission = (e) => {
    // prevent the default behaviour
    e.preventDefault();
    // log the statemenet to check if handler is getting triggered
    console.log("form submission triggered");
    // call the api to edit it
    updateCategoryById(formData)
      .then((res) => {
        console.log("response--->", res);
        toast.success("successfully updated the category");
        handleModalDataUpdateForCategoryWithClose("update");
      })
      .catch((err) => {
        console.log("error category update failed--->", err);
        toast.error(err);
      });
  };

  return (
    <>
      <Modal
        show={showCategoryEdit}
        onHide={handleModalDataUpdateForCategoryWithClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{formData?.categoryTitle}</Modal.Title>
        </Modal.Header>
        <Card>
          <Card.Body>
            <Form onSubmit={handleCategoryEditFormSubmission}>
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
                <img src={formData?.categoryCoverImage} className="img-fluid" />
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
            onClick={handleModalDataUpdateForCategoryWithClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
