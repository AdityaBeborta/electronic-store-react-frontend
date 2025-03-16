import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const AddCategory = () => {
  // 1️⃣ Initialize the form using useForm()
  const {
    register, // Registers input fields
    handleSubmit, // Handles form submission
    formState: { errors }, // Stores validation errors
  } = useForm();
  console.log(useForm());
  

  // 2️⃣ Form submission handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <Card className="border-1 shadow">
        <Card.Body>
          <h3 className="uppercase">
            Please fill in these details to add a Category !
          </h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Category Name */}
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryTitle"
                {...register("categoryTitle", {
                  required: "Category Title is required",
                })}
                placeholder="Please enter the category name"
                isInvalid={errors?.categoryTitle?.message}
              />
              {/* for showing error message */}
              <Form.Control.Feedback type="invalid">
                {errors?.categoryTitle?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Category Description */}
            <Form.Group>
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                type="text"
                name="categoryDescription"
                {...register("categoryDescription", {
                  required: "Category Name is required",
                })}
                placeholder="Please enter the category description"
              />
            </Form.Group>
            {/* Image URL */}
            <Form.Group>
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="text"
                name="categoryCoverImage"
                {...register("categoryCoverImage", {
                  required: "Category Image URL is required",
                })}
                placeholder="Please enter the category image URL"
              />
            </Form.Group>
            <div className="text-center mt-2">
              <Button variant="success" type="submit">
                submit
              </Button>
              <Button className="ms-2" variant="warning">
                reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
