"use client";

import { Show } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { Typography, Tag, Space } from "antd";
import { UserOutlined, CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";

const { Title, Text } = Typography;

interface ShowMemberPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function ShowMemberPage({ params }: ShowMemberPageProps) {
  const { locale, id } = use(params);
  
  const { result: data, query } = useOne({
    resource: "demo_member",
    id: id
  });
  
  const isLoading = query.isLoading;

  const record = data?.data;

  return (
    <AdminLayout locale={locale}>
      <Show
        title="Chi tiết Member"
        isLoading={isLoading}
      >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4}>
            <UserOutlined /> Thông tin cơ bản
          </Title>
          <Space direction="vertical" size="small">
            <div>
              <Text strong>Username: </Text>
              <Text>{record?.username}</Text>
            </div>
            <div>
              <Text strong>Họ tên: </Text>
              <Text>{record?.full_name || 'Chưa cập nhật'}</Text>
            </div>
            <div>
              <Text strong>Trạng thái: </Text>
              <Tag 
                color={record?.status === 1 ? 'green' : 'red'}
                icon={record?.status === 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              >
                {record?.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
              </Tag>
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
