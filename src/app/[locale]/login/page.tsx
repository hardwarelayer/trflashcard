"use client"

import { useLogin } from "@refinedev/core";
import { Button, Card, Form, Input, Typography, Select, Space } from "antd";
import { UserOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const { Title, Text } = Typography;

export default function Login() {
  const { mutate: login } = useLogin();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Replace current locale in pathname
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const onFinish = (values: { email: string; password: string }) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>🎉 TR Flashcard</Title>
          <Text type="secondary">{t('auth.adminLogin')}</Text>
        </div>
        
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Space>
            <GlobalOutlined />
            <Select
              value={locale}
              onChange={handleLanguageChange}
              style={{ width: 120 }}
              size="small"
            >
              <Select.Option value="vi">🇻🇳 Tiếng Việt</Select.Option>
              <Select.Option value="en">🇺🇸 English</Select.Option>
            </Select>
          </Space>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('errors.required') },
              { type: 'email', message: t('errors.invalidEmail') }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={t('auth.email')} 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('errors.required') }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder={t('auth.password')} 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              style={{ height: '40px' }}
            >
              {t('auth.login')}
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Text type="secondary">
            {t('auth.adminNote')}
          </Text>
        </div>
      </Card>
    </div>
  );
}