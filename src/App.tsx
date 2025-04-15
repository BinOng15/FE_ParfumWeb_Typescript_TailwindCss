import React, { useEffect } from "react";
import "./index.css";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import { login } from "./redux/authSlice";
import authService from "./services/authService";

const App: React.FC = () => {
  useEffect(() => {
    const restoreAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await authService.getCurrentUser(token);
          const userData = {
            customerId: user.customerId,
            email: user.email,
            roleName: user.roleName,
          };
          store.dispatch(login(userData));
        } catch (error) {
          console.error("Không thể khôi phục xác thực:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    };
    restoreAuth();
  }, []);

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;