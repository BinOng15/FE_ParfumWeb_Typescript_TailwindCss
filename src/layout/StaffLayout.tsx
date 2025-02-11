import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const StaffLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#123456",
          color: "white",
          textAlign: "center",
          padding: "16px",
        }}
      >
        Staff Dashboard
      </Header>
      <Content style={{ padding: "20px" }}>{children}</Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#123456",
          color: "white",
          padding: "16px",
        }}
      >
        Staff Footer
      </Footer>
    </Layout>
  );
};

export default StaffLayout;
