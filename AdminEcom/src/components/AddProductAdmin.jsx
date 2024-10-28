import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProductAdmin = () => {

 const  navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Product created:', data);
        alert('Product created successfully!');
        setProduct({
          name: '',
          price: 0,
          description: '',
          image: '',
        });
      })
      .catch((error) => console.error('Error creating product:', error));
      navigate('/products')
  };

  return (
    <Container className="py-5">
      <Row className="d-flex align-items-center justify-content-center">
        {/* Product Details Form */}
        <Col md={6}>
          <Card className="border-0 shadow-md p-4">
            <Card.Body>
              <Form>
                <Form.Group controlId="formProductName" className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    value={product.name} 
                    onChange={handleChange} 
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formProductPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="price" 
                    value={product.price} 
                    onChange={handleChange} 
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formProductDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="description" 
                    value={product.description} 
                    onChange={handleChange} 
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formProductImage" className="mb-3">
                  <Form.Label>Image Upload</Form.Label>
                  <Form.Control 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    required
                  />
                </Form.Group>

                {product.image && (
                  <img 
                    src={product.image} 
                    alt="Product Preview" 
                    className="img-fluid my-3" 
                    style={{ maxHeight: '200px', objectFit: 'cover' }} 
                  />
                )}

                <Button 
                  variant="primary" 
                  className="w-100 mb-4" 
                  onClick={handleSubmit}
                >
                  Add Product
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductAdmin;
