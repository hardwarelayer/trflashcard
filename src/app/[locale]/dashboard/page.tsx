"use client";

import { useList } from "@refinedev/core";
import { Card, Col, Row, Statistic } from "antd";
import { UserOutlined, BookOutlined, SettingOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";

interface DashboardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = use(params);
  
  // Mock data for now - will be replaced with real data later
  const totalMembers = 0;
  const totalCards = 0;
  const recentMembers = 0;
  const recentCards = 0;

  return (
    <AdminLayout locale={locale}>
      <div>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
          🎉 TR Flashcard Admin Dashboard
        </h1>

      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Members"
              value={totalMembers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Cards"
              value={totalCards}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Recent Members"
              value={recentMembers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Recent Cards"
              value={recentCards}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="👥 Members" style={{ height: '200px' }}>
            <p>Quản lý thành viên</p>
            <p style={{ color: '#666' }}>Tổng số thành viên: {totalMembers}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="📚 Cards" style={{ height: '200px' }}>
            <p>Quản lý thẻ học</p>
            <p style={{ color: '#666' }}>Tổng số thẻ: {totalCards}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="⚙️ Settings" style={{ height: '200px' }}>
            <p>Cấu hình hệ thống</p>
            <p style={{ color: '#666' }}>Cài đặt ứng dụng</p>
          </Card>
        </Col>
      </Row>
      </div>
    </AdminLayout>
  );
}