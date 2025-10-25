"use client"

import { useLogin } from "@refinedev/core";
import { Button, Card, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslations } from 'next-intl';

const { Title, Text } = Typography;

export default function Login() {
  const { mutate: login } = useLogin();
  const t = useTranslations();

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