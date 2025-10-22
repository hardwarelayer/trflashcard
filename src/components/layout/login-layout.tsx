"use client";

import { Layout } from "antd";

const { Content } = Layout;

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content>
        {children}
      </Content>
    </Layout>
  );
}
