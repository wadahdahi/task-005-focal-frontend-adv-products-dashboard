import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./AddNewItem.css";

interface AddNewItemProps {
  handleAddItem: (item: FormData) => Promise<void>;
  onBack: () => void;
}

const AddNewItem: React.FC<AddNewItemProps> = ({ handleAddItem, onBack }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", imageFile);

    try {
      setSubmitting(true);
      await handleAddItem(formData);
      setName("");
      setPrice("");
      setImageFile(null);
      onBack();
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-new-item d-flex flex-column align-items-start">
      <Button
        variant="link"
        className="btn-back mb-3 p-0 rounded-pill"
        onClick={onBack}
      >
        &lt;
      </Button>
      <Form className="d-flex flex-column gap-3 mb-4" onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="productImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                required
              />
            </Form.Group>
          </Col>

          <Button type="submit" variant="success" disabled={submitting}>
            {submitting ? "Saving..." : "SAVE"}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddNewItem;
