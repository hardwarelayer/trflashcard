"use client";

import { Card, Col, Row, Statistic, Spin } from "antd";
import { UserOutlined, BookOutlined, SettingOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { supabaseBrowserClient as supabase } from "../../../../lib/supabase/client";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

function DashboardContent() {
  const t = useTranslations();
  
  // Real data from Supabase
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [recentMembers, setRecentMembers] = useState(0);
  const [recentCards, setRecentCards] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch total members
        const { count: membersCount } = await supabase
          .from('demo_member')
          .select('*', { count: 'exact', head: true });
        
        // Fetch total cards
        const { count: cardsCount } = await supabase
          .from('demo_card')
          .select('*', { count: 'exact', head: true });
        
        // Fetch recent members (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { count: recentMembersCount } = await supabase
          .from('demo_member')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString());
        
        // Fetch recent cards (last 7 days)
        const { count: recentCardsCount } = await supabase
          .from('demo_card')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString());
        
        setTotalMembers(membersCount || 0);
        setTotalCards(cardsCount || 0);
        setRecentMembers(recentMembersCount || 0);
        setRecentCards(recentCardsCount || 0);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p style={{ marginTop: '16px' }}>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
          🎉 {t('dashboard.title')}
        </h1>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.totalMembers')}
              value={totalMembers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.totalCards')}
              value={totalCards}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.recentMembers')}
              value={recentMembers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('dashboard.recentCards')}
              value={recentCards}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title={`👥 ${t('dashboard.membersTitle')}`} style={{ height: '200px' }}>
            <p>{t('dashboard.membersDescription')}</p>
            <p style={{ color: '#666' }}>{t('dashboard.totalMembersCount')}: {totalMembers}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={`📚 ${t('dashboard.cardsTitle')}`} style={{ height: '200px' }}>
            <p>{t('dashboard.cardsDescription')}</p>
            <p style={{ color: '#666' }}>{t('dashboard.totalCardsCount')}: {totalCards}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={`⚙️ ${t('dashboard.settingsTitle')}`} style={{ height: '200px' }}>
            <p>{t('dashboard.settingsDescription')}</p>
            <p style={{ color: '#666' }}>{t('dashboard.appSettings')}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

interface DashboardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <DashboardContent />
    </AdminLayout>
  );
}