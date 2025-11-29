import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.tsx";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.tsx";
import NotFoundPage from "./pages/Errors/NotFoundPage/NotFoundPage.tsx";
import OrderListPage from "./pages/OrderListPage/OrderListPage.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "products-page", element: <ProductsPage /> },
      { path: "favorites-page", element: <FavoritesPage /> },
      { path: "order-list-page", element: <OrderListPage /> },
    ],
    errorElement: <NotFoundPage id="not-found-error-page" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
