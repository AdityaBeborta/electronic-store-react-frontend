import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

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
    live: true,
    stock: true,
    productImageName: "",
  });
  //product input handler
  const handleProductInputChange = (e) => {
    console.log("handle product change triggered");
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <>
      <Card className="shadow border-1">
        <Card.Body>
          <h4>Please fill in this form to add a product</h4>
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
          <Row className="mt-2">
            <Col md={6}>
              <Form.Group>
                <Form.Check
                  type="switch"
                  id="custom-switch1"
                  label="Live"
                  name="live"
                  value={product?.live}
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
                  value={product?.stock}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
