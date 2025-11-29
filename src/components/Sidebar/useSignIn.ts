import { useContext } from "react";
import { SignInContext } from "./AuthProvider";

export const useSignIn = () => {
  const context = useContext(SignInContext);
  if (!context) throw new Error("useSignIn must be used within SignInProvider");
  return context;
};
