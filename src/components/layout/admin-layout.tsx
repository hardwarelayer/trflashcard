"use client";

import { Layout } from "antd";
import Sidebar from "@/components/navigation/sidebar";

const { Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function AdminLayout({ children, locale }: AdminLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar locale={locale} />
      <Layout>
        <Content style={{ padding: '24px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}