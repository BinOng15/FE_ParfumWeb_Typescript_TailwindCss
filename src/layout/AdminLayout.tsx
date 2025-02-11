import React from "react";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          color: "white",
          textAlign: "center",
          padding: "16px",
        }}
      >
        Admin Panel
      </Header>
      <Content style={{ padding: "20px" }}>{children}</Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "white",
          padding: "16px",
        }}
      >
        Admin Footer
      </Footer>
    </Layout>
  );
};

export default AdminLayout;
