"use client";

import { Layout, Menu, Button } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  BookOutlined, 
  SettingOutlined,
  LogoutOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useLogout } from '@refinedev/core';
import { useTranslations } from 'next-intl';

const { Sider } = Layout;

interface SidebarProps {
  locale: string;
}

export default function Sidebar({ locale }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: logout } = useLogout();
  const t = useTranslations();

  const handleLogout = () => {
    logout();
  };

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const menuItems = [
    {
      key: `/${locale}/dashboard`,
      icon: <DashboardOutlined />,
      label: t('navigation.dashboard'),
    },
    {
      key: `/${locale}/members`,
      icon: <UserOutlined />,
      label: t('navigation.members'),
    },
    {
      key: `/${locale}/cards`,
      icon: <BookOutlined />,
      label: t('navigation.cards'),
    },
    {
      key: `/${locale}/settings`,
      icon: <SettingOutlined />,
      label: t('navigation.settings'),
    },
  ];

  return (
    <Sider
      width={250}
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
        <h3 style={{ margin: 0, color: '#1890ff' }}>🎉 TR Flashcard</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>
          {t('navigation.adminPanel')}
        </p>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
        style={{ border: 'none' }}
      />

      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        padding: '16px',
        borderTop: '1px solid #f0f0f0',
        background: '#fff'
      }}>
        {/* Language Switcher */}
        <div style={{ marginBottom: '12px' }}>
          <Button
            type={locale === 'vi' ? 'primary' : 'default'}
            size="small"
            onClick={() => handleLanguageChange('vi')}
            style={{ marginRight: '8px' }}
          >
            🇻🇳 VI
          </Button>
          <Button
            type={locale === 'en' ? 'primary' : 'default'}
            size="small"
            onClick={() => handleLanguageChange('en')}
          >
            🇺🇸 EN
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          type="text"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          block
        >
          {t('navigation.logout')}
        </Button>
      </div>
    </Sider>
  );
}
