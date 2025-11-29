import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ProductCard.css";

export interface Product {
  id: number;
  name: string;
  image_url: string;
  price: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="product-card rounded-4">
      <Card.Img variant="top" src={product.image_url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${Number(product.price)}</Card.Text>
      </Card.Body>

      <div className="product-actions">
        <Button
          size="sm"
          variant="warning"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
