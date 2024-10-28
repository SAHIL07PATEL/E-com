import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "GET",
          headers: {
            'content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
        },
      });

      if (response.ok) {
        alert("Deleted Successfully");
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Container fluid>
        <Row className="mt-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Col md={4} lg={3} className="mb-4" key={product.id}>
                <Card className="shadow-sm border-0 rounded-lg overflow-hidden h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className="object-fit-contain"
                    style={{ height: '200px' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-dark">{product.name}</Card.Title>
                    <Card.Text className="text-muted">${product.price}</Card.Text>
                    <Card.Text className="text-secondary">{product.description}</Card.Text>

                    <Button
                      variant="outline-primary"
                      className="mt-2"
                      size="sm"
                    >
                      <Link
                        to={`/products/${product.id}`}
                        className="text-decoration-none"
                      >
                        View Details
                      </Link>
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="mt-2"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h1>No Data Found</h1>
          )}
        </Row>
      </Container>
    </div>
  );
}
