import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface SignInContextProps {
  showAuth: boolean;
  setShowAuth: (value: boolean) => void;
}

export const SignInContext = createContext<SignInContextProps | undefined>(
  undefined
);

export const SignInProvider = ({ children }: { children: ReactNode }) => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <SignInContext.Provider value={{ showAuth, setShowAuth }}>
      {children}
    </SignInContext.Provider>
  );
};
