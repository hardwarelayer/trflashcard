"use client";

import { Layout } from 'antd';
import Sidebar from '../navigation/sidebar';

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
        <Content
          style={{
            margin: 0,
            padding: '24px',
            background: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
