"use client";

import { Layout } from "antd";
import Sidebar from "@/components/navigation/sidebar";
import { NextIntlClientProvider } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const { Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function AdminLayout({ children, locale }: AdminLayoutProps) {
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = (await import(`../../../messages/${locale}.json`)).default;
        setMessages(messages);
      } catch (error) {
        console.error('Error loading messages:', error);
        // Fallback to default messages
        const defaultMessages = (await import(`../../../messages/vi.json`)).default;
        setMessages(defaultMessages);
      }
    };

    loadMessages();
  }, [locale]);

  if (!messages) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar locale={locale} />
        <Layout>
          <Content style={{ padding: '24px' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </NextIntlClientProvider>
  );
}