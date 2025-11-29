import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar/Sidebar";
import { AuthProvider } from "./components/context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Sidebar />
      <main className="w-100 h-100 p-0 align-items-start justify-content-end">
        <Outlet />
      </main>
    </AuthProvider>
  );
}

export default App;
