import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./EditItem.css";

interface EditItemProps {
  product: {
    id: number;
    name: string;
    price: string;
    image_url: string;
  };
  onSave: (
    id: number,
    formData: FormData,
    imageFile?: File | null
  ) => Promise<void>;
  onBack: () => void;
}

const EditItem: React.FC<EditItemProps> = ({ product, onSave, onBack }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (imageFile) formData.append("image", imageFile);
    formData.append("_method", "PUT");
    await onSave(product.id, formData, imageFile);
  };

  return (
    <div className="add-item-container">
      <Button
        variant="link"
        className="back-btn d-flex flex-column align-items-center justify-content-center rounded-pill"
        onClick={onBack}
      >
        <img
          className="back-arrow-icon d-block"
          src="/images/icons/arrow.png"
          alt=""
        />
      </Button>
      <Form className="add-item-form" onSubmit={handleSave}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.currentTarget.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <div className="image-input-wrapper">
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={(e) =>
                  setImageFile(e.currentTarget.files?.[0] ?? null)
                }
              />
              <label
                htmlFor="imageUpload"
                className="image-label"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : product.image_url
                  }
                  className="preview-image"
                  alt="Preview"
                />
              </label>
            </div>
          </Col>
        </Row>
        <Button type="submit" className="save-btn">
          SAVE
        </Button>
      </Form>
    </div>
  );
};

export default EditItem;
