import { Button, Col, Container, Row } from "react-bootstrap";
import "./ProductDetails.css";

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  return (
    <Container className="product-details d-flex flex-column w-100 h-100">
      <Row>
        <Button
          variant="link"
          className="back-btn d-flex flex-column align-items-center justify-content-center rounded-pill mb-5"
          onClick={onBack}
        >
          <img
            className="back-arrow-icon d-block"
            src="/images/icons/arrow.png"
            alt=""
          />
        </Button>
      </Row>
      <Row className="align-items-start justify-content-start text-start">
        <h2 className="fs-1 fw-semibold">{product.name}</h2>
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image mb-4 rounded-5 overflow-hidden"
        />
      </Row>
      <Row className="align-items-start justify-content-start text-start">
        <>
          <Col>
            <p className="product-detail-text fs-3 fw-semibold">
              Price:{" "}
              <span className="product-date fs-4 fw-medium">
                {product.price}
              </span>
            </p>
          </Col>
          <Col>
            <p className="product-detail-text fs-3 fw-semibold mb-4">
              Added at:{" "}
              <span className="product-date fs-4 fw-medium">
                {product.created_at
                  ? new Date(product.created_at).toLocaleString()
                  : "N/A"}
              </span>
            </p>
          </Col>
        </>
      </Row>
      <Row className="align-items-center justify-content-center text-center">
        <p className="product-detail-text fs-3 fw-semibold">
          Updated at:{" "}
          <span className="product-date fs-4 fw-medium">
            {product.updated_at
              ? new Date(product.updated_at).toLocaleString()
              : "N/A"}
          </span>
        </p>
      </Row>
    </Container>
  );
};

export default ProductDetails;
