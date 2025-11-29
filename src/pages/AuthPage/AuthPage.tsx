import { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./AuthPage.css";
import { useAuth } from "../../components/hooks/useAuth";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  rePassword: string;
  file?: File | null;
}

interface SignInData {
  email: string;
  password: string;
}

interface ApiError {
  response?: { data?: { message?: string } };
  message: string;
}

const AuthPage = () => {
  const { showAuth, setShowAuth, login } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    rePassword: "",
    file: null,
  });
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSignUpData((prev) => ({ ...prev, file }));
    setFileName(file?.name ?? "");
  };

  const handleSignUpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (signUpData.password !== signUpData.rePassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("first_name", signUpData.firstName);
    formData.append("last_name", signUpData.lastName);
    formData.append("email", signUpData.email);
    formData.append("user_name", signUpData.userName);
    formData.append("password", signUpData.password);
    formData.append("password_confirmation", signUpData.rePassword);
    if (signUpData.file) formData.append("profile_image", signUpData.file);

    try {
      const response = await axios.post(
        "https://dashboard-i552.onrender.com/api/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      console.log("My TOKEN is: ", token);

      alert("Account created successfully!");
      login({
        firstName: signUpData.firstName || "User",
        lastName: signUpData.lastName || "",
        email: signUpData.email,
      });
    } catch (error) {
      const err = error as ApiError;
      alert("Sign Up Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://dashboard-i552.onrender.com/api/login",
        signInData
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      console.log("My TOKEN is: ", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      login({
        firstName: "User",
        lastName: "",
        email: signInData.email,
      });
      setShowAuth(false);
      console.log("Logged in successfully!");
      alert("Logged in successfully!");
    } catch (error) {
      const err = error as ApiError;
      alert("Sign In Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!showAuth) return null;

  return (
    <div className="auth-page d-flex w-100 h-100 justify-content-center align-items-center position-absolute">
      <Form
        className="auth-form mx-auto d-flex flex-column h-auto max-h-custom rounded-4 bg-white"
        onSubmit={mode === "signup" ? handleSignUpSubmit : handleSignInSubmit}
      >
        <Form.Group>
          <button
            type="button"
            className="close-auth rounded-circle"
            onClick={() => setShowAuth(false)}
          >
            ✕
          </button>
        </Form.Group>
        <Form.Group>
          <img
            className="platform-logo-form mb-4"
            src="/public/images/logo/platform-logo.png"
          />
        </Form.Group>

        {mode === "signin" && (
          <>
            <h2 className="fw-semibold mb-2">SIGN IN</h2>
            <p className="form-caption text-muted fw-normal mb-5">
              Enter your credentials to access your account
            </p>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
                value={signInData.email}
                onChange={handleSignInChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter your password"
                value={signInData.password}
                onChange={handleSignInChange}
              />
            </Form.Group>
            <Button
              className="auth-btn w-100 fw-medium"
              variant="warning"
              type="submit"
              disabled={loading}
            >
              SIGN IN
            </Button>
            <p className="form-caption mt-3 text-center">
              Don’t have an account?
              <span
                role="button"
                className="auth-link cursor-pointer"
                onClick={() => setMode("signup")}
              >
                {" "}
                Create one
              </span>
            </p>
          </>
        )}

        {mode === "signup" && (
          <>
            <h2 className="fw-semibold mb-3">SIGN UP</h2>
            <p className="form-caption text-muted fw-normal mb-2">
              Fill in the following fields to create an account.
            </p>

            <Form.Group className="align-items-start d-flex flex-column mb-2 w-100">
              <Form.Label className="mb-1">Name</Form.Label>
              <Form.Group className="input-field d-flex flex-row gap-4 justify-content-between w-100">
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={signUpData.firstName}
                  onChange={handleSignUpChange}
                />
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={signUpData.lastName}
                  onChange={handleSignUpChange}
                />
              </Form.Group>
            </Form.Group>

            <Form.Group className="align-items-start d-flex flex-column mb-2">
              <Form.Label className="mb-1">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
                value={signUpData.email}
                onChange={handleSignUpChange}
              />
            </Form.Group>

            <Form.Group className="align-items-start d-flex flex-column mb-2">
              <Form.Label className="mb-1">Username</Form.Label>
              <Form.Control
                name="userName"
                type="text"
                placeholder="Enter username"
                value={signUpData.userName}
                onChange={handleSignUpChange}
              />
            </Form.Group>

            <Form.Group className="align-items-start d-flex flex-column mb-2">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Group className="d-flex flex-row gap-4 justify-content-between w-100">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
                <Form.Control
                  name="rePassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={signUpData.rePassword}
                  onChange={handleSignUpChange}
                />
              </Form.Group>
            </Form.Group>

            <Form.Label className="d-flex flex-column mb-1 align-items-start">
              <Form.Label className="mb-1">Profile Image</Form.Label>
              <Form.Group
                className="custom-file-container mb-2"
                onClick={handleFileClick}
              >
                <img src="/images/icons/upload-icon.png" alt="" />
                <p>{fileName}</p>
                <Form.Control
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </Form.Group>
            </Form.Label>

            <Button
              className="auth-btn w-100 fw-medium"
              variant="warning"
              type="submit"
              disabled={loading}
            >
              SIGN UP
            </Button>

            <p className="form-caption mt-3 text-center">
              Do you have an account?
              <span
                role="button"
                className="auth-link cursor-pointer"
                onClick={() => setMode("signin")}
              >
                {" "}
                Sign in
              </span>
            </p>
          </>
        )}
      </Form>
    </div>
  );
};

export default AuthPage;
