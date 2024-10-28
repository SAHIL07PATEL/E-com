import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailsAdmin = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

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
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Product updated:', data);
        alert('Product updated successfully!');
        navigate('/products')
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  return (
    <Container className="py-5">
      <Row className="d-flex align-items-center justify-content-center">
        {/* Product Image */}
        <Col md={5} className="mb-4 mb-md-0">
          <Card className="border-0 shadow-sm">
            <Card.Img 
              src={product.image} 
              alt={product.name} 
              className="rounded-lg" 
              style={{ height: 'auto', maxWidth: '100%', objectFit: 'cover' }}
            />
          </Card>
        </Col>

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
                  />
                </Form.Group>

                <Form.Group controlId="formProductPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="price" 
                    value={product.price} 
                    onChange={handleChange} 
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
                  />
                </Form.Group>

                <Form.Group controlId="formProductImage" className="mb-3">
                  <Form.Label>Choose Image</Form.Label>
                  <Form.Control 
                    type="file" 
                    onChange={handleFileChange} 
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  className="w-100 mb-4" 
                  onClick={handleSubmit}
                >
                  Update Product
                </Button>
              </Form>

              {/* Additional Information Section */}
              <div className="border-top pt-3">
                <h2 className="h5">Additional Information</h2>
                <ul className="list-unstyled text-muted mt-2">
                  <li>SKU: {product.id}</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsAdmin;
