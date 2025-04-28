import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

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
    productImageName: "",
  });
  //product input handler
  const handleProductInputChange = (e) => {
    console.log("handle product change triggered");
    const { name, value, checked, type } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  //   product form submit handler
  const handleProductSubmit = (e) => {
    console.log("product submit triggered");
    e.preventDefault();
    // form data
    console.table(product);
  };

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
            <Form.Group className="mt-2">
              <Form.Label>Please select the product image</Form.Label>
              <Form.Control type="file" name="productImageName" />
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
