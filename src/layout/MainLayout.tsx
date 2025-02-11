import React from "react";
import { Layout } from "antd";
import CustomHeader from "./Header";
import CustomFooter from "./Footer";

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <CustomHeader />

      {/* Nội dung chính */}
      <Content
        style={{ padding: "20px", minHeight: "80vh", background: "white" }}
      >
        {children}
      </Content>

      {/* Footer */}
      <CustomFooter />
    </Layout>
  );
};

export default MainLayout;
