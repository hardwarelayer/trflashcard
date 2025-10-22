"use client";

import { Show } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { Typography, Tag, Space } from "antd";
import { BookOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";

const { Title, Text } = Typography;

interface ShowCardPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function ShowCardPage({ params }: ShowCardPageProps) {
  const { locale, id } = use(params);
  
  const { data, isLoading } = useOne({
    resource: "demo_card",
    id: id
  });

  const record = data?.data;

  return (
    <AdminLayout locale={locale}>
      <Show
        title="Chi tiết Card"
        isLoading={isLoading}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={4}>
              <BookOutlined /> Thông tin cơ bản
            </Title>
            <Space direction="vertical" size="small">
              <div>
                <Text strong>Tiêu đề: </Text>
                <Text>{record?.title}</Text>
              </div>
              <div>
                <Text strong>Nội dung: </Text>
                <Text>{record?.content}</Text>
              </div>
              <div>
                <Text strong>Member ID: </Text>
                <Text code>{record?.member_id}</Text>
              </div>
            </Space>
          </div>

          <div>
            <Title level={4}>
              <CalendarOutlined /> Thông tin hệ thống
            </Title>
            <Space direction="vertical" size="small">
              <div>
                <Text strong>Ngày tạo: </Text>
                <Text>{record?.created_at ? new Date(record.created_at).toLocaleString('vi-VN') : 'N/A'}</Text>
              </div>
              <div>
                <Text strong>Cập nhật lần cuối: </Text>
                <Text>{record?.updated_at ? new Date(record.updated_at).toLocaleString('vi-VN') : 'N/A'}</Text>
              </div>
              <div>
                <Text strong>ID: </Text>
                <Text code>{record?.id}</Text>
              </div>
            </Space>
          </div>
        </Space>
      </Show>
    </AdminLayout>
  );
}
