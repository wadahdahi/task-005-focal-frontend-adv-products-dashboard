import { Button } from "react-bootstrap";
import "./DeleteItems.css";

interface DeleteItemProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-overlay d-flex justify-content-center align-items-center w-100 h-100">
      <div className="blurred-background d-flex w-100 h-100 position-fixed">
        {""}
      </div>
      <div className="delete-box bg-white p-5 rounded-2 shadow">
        <p className="fs-4 fw-semibold mb-4">
          Are you sure you want to delete the product?
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button size="sm" variant="warning" onClick={onConfirm}>
            Yes
          </Button>
          <Button size="sm" variant="warning" onClick={onCancel}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
