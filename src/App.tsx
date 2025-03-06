import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}><Router>
      <AppRouter />
    </Router></Provider>

  );
};

export default App;
