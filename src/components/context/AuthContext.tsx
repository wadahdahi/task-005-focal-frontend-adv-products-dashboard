import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logoutFromServer: () => Promise<void>;
  showAuth: boolean;
  setShowAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowAuth(false);
    console.log("Login successful:", userData);
  };

  const logoutFromServer = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No token found. Logout failed.");
      console.log("Logout failed: no token");
      return;
    }
    try {
      await axios.post(
        "https://dashboard-i552.onrender.com/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Logout request sent successfully");
    } catch (error: unknown) {
      const err = error as { message: string };
      alert("Logout failed: " + err.message);
      console.log("Logout failed:", err.message);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      setShowAuth(false);
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
      alert("Logout successful!");
      console.log("Logout finalized, state cleared");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ firstName: "User", lastName: "", email: "" });
      setIsLoggedIn(true);
      console.log("Token found, user set to logged in");
    } else {
      console.log("No token found on load");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logoutFromServer,
        showAuth,
        setShowAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
