// Sidebar.tsx
import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Sidebar.css";
import AuthPage from "../../pages/AuthPage/AuthPage";

const Sidebar = () => {
  const { isLoggedIn, logoutFromServer, showAuth, setShowAuth } = useAuth();
  const [loadingLogout, setLoadingLogout] = useState(false);

  const links = [
    { name: "Products", path: "/products-page" },
    { name: "Favorites", path: "/favorites-page" },
    { name: "Orders", path: "/order-list-page" },
  ];

  const handleLogout = async () => {
    setLoadingLogout(true);
    await logoutFromServer();
    setLoadingLogout(false);
  };

  return (
    <>
      <nav className="sidebar d-flex flex-column h-100 nav-padding text-light align-items-center justify-content-between">
        <div>
          <img
            src="/images/logo/platform-logo-yellow-tape.png"
            alt="Logo"
            className="platform-logo mb-3"
          />
          <img
            src="/images/user-profile-images/user-profile-image-0001.png"
            alt="User Profile"
            className="user-profile-image d-block rounded-circle mb-2"
          />
          <p className="text-black fw-bold mb-4">Wadah Dahi</p>
        </div>
        <div className="justify-content-between w-100 flex-column">
          <Nav className="w-100 flex-column">
            {links.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className={({ isActive }) =>
                  `btn w-100 fw-medium ${
                    isActive ? "btn-warning" : "btn-outline-warning"
                  } mb-2`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </Nav>
        </div>
        {!isLoggedIn ? (
          <Button
            className="btn-inner-outline bg-warning fw-medium w-100"
            onClick={() => setShowAuth(true)}
          >
            Sign In
          </Button>
        ) : (
          <Button
            className="btn-inner-outline bg-warning fw-medium w-100"
            onClick={handleLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </Button>
        )}
      </nav>
      {showAuth && <AuthPage />}
    </>
  );
};

export default Sidebar;
