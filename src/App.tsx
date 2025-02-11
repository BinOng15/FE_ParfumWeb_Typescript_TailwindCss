import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRouter from "./router/AppRouter";

const App: React.FC = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
