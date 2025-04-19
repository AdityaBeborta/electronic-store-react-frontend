import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addCategory } from "../../services/categories.service";

export const AddCategory = () => {
  // 1️⃣ Initialize the form using useForm()
  const {
    register, // Registers input fields
    handleSubmit, // Handles form submission
    formState, // Stores validation errors
    reset,
  } = useForm();

  // 2️⃣ Form submission handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);

    addCategory(data)
      .then((response) => {
        console.log(response);
        toast.success("category successfully added");
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  return (
    <>
      <Card className="border-1 shadow">
        <Card.Body>
          <h5 className="uppercase">
            Please fill in these details to add a Category !
          </h5>
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
                isInvalid={formState?.errors?.categoryTitle?.message}
              />
              {/* for showing error message */}
              <Form.Control.Feedback type="invalid">
                {formState?.errors?.categoryTitle?.message}
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
