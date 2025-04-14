import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRouter from "./router/AppRouter"; // Đảm bảo đường dẫn đúng
import { Provider } from "react-redux";
import store from "./redux/store"; // Đảm bảo đường dẫn đúng
import { login } from "./redux/authSlice"; // Đảm bảo đường dẫn đúng
import authService from "./services/authService"; // Đảm bảo đường dẫn đúng

const App: React.FC = () => {
  useEffect(() => {
    const restoreAuth = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const user = await authService.getCurrentUser(token);
          const userData = {
            customerId: user.id,
            email: user.email,
            roleName: user.role,
          };
          store.dispatch(login(userData)); // Sử dụng store.dispatch thay vì useDispatch
        } catch (error) {
          console.error("Failed to restore auth:", error);
          sessionStorage.removeItem("token"); // Xóa token nếu không hợp lệ
        }
      }
    };
    restoreAuth();
  }, []); // Không cần phụ thuộc vào dispatch nữa

  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
};

export default App;