import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  FETCH_CATEGORY,
  VALID_FILE_EXTENSIONS,
} from "../../services/helper.service";
import { toast } from "react-toastify";
import {
  addImageToExistingProduct,
  addProductWithCategory,
  addProductWithOutCategory,
} from "../../services/product.service";
import { fetchCategories } from "../../services/categories.service";

export const AddProduct = () => {
  //state for holding product details
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    sellerName: "",
    quantity: 0,
    addedDate: "",
    live: false,
    stock: true,
    productImageName: null,
  });
  // state to handle categories
  const [allCategories, setAllCategories] = useState([]);
  // state to maintain current category selected
  const [currentCategorySelectedId, setCurrentCategorySelectedId] =
    useState("");
  //product input handler
  const handleProductInputChange = (e) => {
    console.log("handle product change triggered");
    const { name, value, checked, type, files } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  //product image handler

  const handleProductImage = (e) => {
    const { files } = e.target;
    if (files) {
      const file = files[0];
      console.table(files);
      //extract the files
      var fileName = file?.name;
      var fileType = file?.type.split("/")[1];
      //validate the file type
      if (!VALID_FILE_EXTENSIONS.includes(fileType)) {
        toast.error("invalid file extension");
        return;
      }
      //preview the image
      setProduct((prevData) => ({
        ...prevData,
        image: file, // set the file object
        imagePreview: URL.createObjectURL(file), // create a local preview URL
      }));
    }
  };

  //product form submit handler
  const handleProductSubmit = (e) => {
    console.log("product submit triggered");
    e.preventDefault();
    // form data
    console.table(product);
    // if category is empty then throw like cannot be empty
    if (currentCategorySelectedId === "") {
      toast.error("please select a category from dropdown");
      return;
    }
    // add product without category
    addProductWithCategory(product, currentCategorySelectedId)
      .then((res) => {
        console.table(res);
        toast.success("product added successfully");
        //since product is added successfully call the image api
        addImageToExistingProduct(res?.data?.productId, product?.image)
          .then((res) => {
            console.log(res);

            toast.success("image uploaded successfully");
            setCurrentCategorySelectedId("");
            setProduct({
              title: "",
              description: "",
              price: 0,
              discountedPrice: 0,
              addedDate: "",
              live: false,
              stock: false,
              productImageName: "",
              image: "",
              imagePreview: "",
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message);
          });
      })
      .catch((error) => {
        console.table(error);
        toast.error("something went wrong while updating product");
      });
  };

  // handler for category dropdown
  const handleCategotyDropdown = (e) => {
    console.log("category dropdown triggered");
    setCurrentCategorySelectedId(e.target.value);
  };

  // load categories on page
  useEffect(() => {
    console.log("Add Product component rendered");
    //fetch all categories
    fetchCategories()
      .then((res) => {
        console.log("fetch category was successful");
        console.log(res);
        setAllCategories(res?.data?.content);
      })
      .catch((error) => {
        console.log("something went wrong while fetching the categories");
        console.log(error);
      });
  }, []);

  return (
    <>
      <Card className="shadow border-1">
        <Card.Body>
          <h4>Please fill in this form to add a product</h4>
          <Form onSubmit={handleProductSubmit}>
            {/* product title */}
            <Form.Group>
              <Form.Label>Product title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="please enter product title"
                value={product?.title}
                onChange={handleProductInputChange}
              />
            </Form.Group>
            {/* category */}
            <Form.Group>
              <Form.Label>Select Category</Form.Label>
              <Form.Select onChange={handleCategotyDropdown}>
                <option>Open this select menu</option>
                {allCategories &&
                  allCategories.map((currentEle) => {
                    return (
                      <>
                        <option
                          key={currentEle?.categoryId}
                          value={currentEle?.categoryId}
                        >
                          {currentEle?.categoryTitle}
                        </option>
                      </>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            {/* product description */}
            <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={6}
                name="description"
                placeholder="please enter the product description"
                value={product?.description}
                onChange={handleProductInputChange}
              />
            </Form.Group>
            {/* Price & Discounted price */}
            <Row>
              <Col md={6}>
                {/* price */}
                <Form.Group>
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    placeholder="please enter the max retailer price"
                    value={product?.price}
                    onChange={handleProductInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* discounted price */}
                <Form.Group>
                  <Form.Label>Discounted Product Price</Form.Label>
                  <Form.Control
                    name="discountedPrice"
                    type="number"
                    placeholder="please enter the discounted price"
                    value={product?.discountedPrice}
                    onChange={handleProductInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                name="quantity"
                placeholder="please enter the product quantity"
                value={product?.quantity}
                onChange={handleProductInputChange}
              />
            </Form.Group>
            <Card className="mt-2 shadow">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Check
                        type="switch"
                        id="custom-switch1"
                        label="Live"
                        name="live"
                        checked={product?.live}
                        onChange={handleProductInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Check
                        type="switch"
                        id="custom-switch2"
                        label="Stock"
                        name="stock"
                        checked={product?.stock}
                        onChange={handleProductInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            {product?.imagePreview && (
              <>
                <Form.Group>
                  <Form.Label>Image preview</Form.Label>
                  <img className="img-fluid" src={product?.imagePreview} />
                </Form.Group>
              </>
            )}
            <Form.Group className="mt-2">
              <Form.Label>Please select the product image</Form.Label>
              <Form.Control type="file" onChange={handleProductImage} />
            </Form.Group>
            <div className="text-center mt-2">
              <Button type="submit" variant="success">
                submit
              </Button>
              <Button className="ms-2" type="button" variant="warning">
                reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
