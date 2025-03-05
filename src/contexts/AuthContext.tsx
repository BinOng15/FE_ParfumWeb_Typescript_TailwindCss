/* eslint-disable no-useless-catch */
import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType, Customer } from "../components/models/Customer";
import authService from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Customer | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const token = await authService.userLogin(email, password);
      sessionStorage.setItem("token", token);

      const userData = await authService.getCurrentUser(token);
      console.log("User data before setting:", userData);
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const getRole = () => {
    return user?.RoleName || null;
  };

  return (
    <AuthContext.Provider value={{ user, login, setUser, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
