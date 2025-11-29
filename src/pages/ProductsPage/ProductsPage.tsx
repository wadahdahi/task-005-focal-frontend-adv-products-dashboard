import { useEffect, useState } from "react";
import axios from "axios";
import { Button, FormControl } from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAuth } from "../../components/hooks/useAuth";
import "./ProductsPage.css";
import { BsSearch } from "react-icons/bs";
import type { Product } from "../../components/ProductCard/ProductCard";
import AddNewItem from "../../components/Modals/AddNewItem";
import EditItem from "../../components/Modals/EditItem";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import DeleteItem from "../../components/Modals/DeleteItems";

const ITEMS_PER_PAGE = 8;

const ProductsPage = () => {
  const { isLoggedIn, setShowAuth } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleAddItem = async (formData: FormData, imageFile?: File | null) => {
    try {
      await axios.post(
        "https://dashboard-i552.onrender.com/api/items",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const newProduct: Product = {
        id: Date.now(),
        name: formData.get("name") as string,
        price: formData.get("price") as string,
        image_url: imageFile ? URL.createObjectURL(imageFile) : "",
      };

      setProducts((prev) => [...prev, newProduct]);
      setShowAddNewItem(false);
      alert("Product added successfully.");
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add product. Please try again.");
      throw error;
    }
  };

  const handleEditItem = async (
    id: number,
    formData: FormData,
    imageFile?: File | null
  ) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be signed in to edit products.");
      setShowAuth(true);
      return;
    }
    try {
      await axios.post(
        `https://dashboard-i552.onrender.com/api/items/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === id
            ? {
                ...prod,
                name: formData.get("name") as string,
                price: formData.get("price") as string,
                image_url: imageFile
                  ? URL.createObjectURL(imageFile)
                  : prod.image_url,
              }
            : prod
        )
      );

      setShowEditItem(false);
      setEditingProduct(null);
      alert("Product updated successfully.");
    } catch (error) {
      console.error("Failed to edit item:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`https://dashboard-i552.onrender.com/api/items/${id}`);
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
      setDeletingProduct(null);
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dashboard-i552.onrender.com/api/items"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("Failed to load products.");
      }
    };
    fetchProducts();
  }, [isLoggedIn]);

  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchText.toLowerCase().trim())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPaginationButtons = () => {
    if (totalPages <= 4)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, "...", totalPages];
  };

  const goToPage = (page: number | string) => {
    if (page === "...") return;
    setCurrentPage(page as number);
  };

  return (
    <div className="products-page-initial container d-flex flex-column w-100 h-100">
      {!isLoggedIn && (
        <div>
          <p className="text-start mt-5 fw-bold text-warning">
            Please{" "}
            <button
              className="btn btn-sign-in-welcome text-warning text-decoration-underline fw-medium p-0"
              onClick={() => setShowAuth(true)}
            >
              Sign in
            </button>{" "}
            to view the products.
          </p>
        </div>
      )}
      {isLoggedIn && (
        <>
          {deletingProduct ? (
            <DeleteItem
              onConfirm={() => handleDeleteItem(deletingProduct.id)}
              onCancel={() => setDeletingProduct(null)}
            />
          ) : viewingProduct ? (
            <ProductDetails
              product={viewingProduct}
              onBack={() => setViewingProduct(null)}
            />
          ) : showAddNewItem ? (
            <AddNewItem
              handleAddItem={handleAddItem}
              onBack={() => setShowAddNewItem(false)}
            />
          ) : showEditItem && editingProduct ? (
            <EditItem
              key={editingProduct.id}
              product={editingProduct}
              onSave={handleEditItem}
              onBack={() => setShowEditItem(false)}
            />
          ) : (
            <div className="products-page d-flex flex-column justify-content-start align-items-start w-100 h-100">
              <div className="search-wrapper d-block position-relative mb-4">
                <FormControl
                  className="search-bar"
                  type="search"
                  placeholder="Search product by name"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                {!searchText && (
                  <BsSearch className="search-icon position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                )}
              </div>
              <Button
                className="btn-add-new-item rounded-1 text-white border mb-3 fw-medium"
                variant="success"
                onClick={() => setShowAddNewItem(true)}
              >
                ADD NEW PRODUCT
              </Button>
              <div className="pagination d-flex flex-column w-100">
                <div className="grid-paginaiton row mb-4">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="col-3 g-3"
                      onClick={() => setViewingProduct(product)}
                    >
                      <ProductCard
                        product={product}
                        onEdit={() => {
                          setEditingProduct(product);
                          setShowEditItem(true);
                        }}
                        onDelete={() => setDeletingProduct(product)}
                      />
                    </div>
                  ))}
                </div>
                <div className="pagination-buttons d-flex justify-content-center align-items-center gap-1">
                  <Button
                    className="btn-pagination"
                    variant="outline-secondary"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    &lt;
                  </Button>
                  {getPaginationButtons().map((p, idx) =>
                    typeof p === "number" ? (
                      <Button
                        key={idx}
                        className="btn-pagination"
                        variant={
                          currentPage === p ? "warning" : "outline-warning"
                        }
                        onClick={() => goToPage(p)}
                      >
                        {p}
                      </Button>
                    ) : (
                      <span key={idx} className="px-2">
                        ...
                      </span>
                    )
                  )}
                  <Button
                    className="btn-pagination"
                    variant="outline-secondary"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
