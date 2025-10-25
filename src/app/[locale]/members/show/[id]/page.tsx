"use client";

import { Show } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { Typography, Tag, Space } from "antd";
import { UserOutlined, CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useTranslations } from 'next-intl';

const { Title, Text } = Typography;

function ShowMemberContent({ id }: { id: string }) {
  const t = useTranslations();
  
  const { result: data, query } = useOne({
    resource: "demo_member",
    id: id
  });
  
  const isLoading = query.isLoading;

  const record = data?.data;

  return (
    <Show
      title={t('members.show')}
      isLoading={isLoading}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4}>
            <UserOutlined /> {t('members.basicInfo')}
          </Title>
          <Space direction="vertical" size="small">
            <div>
              <Text strong>{t('members.username')}: </Text>
              <Text>{record?.username}</Text>
            </div>
            <div>
              <Text strong>{t('members.fullName')}: </Text>
              <Text>{record?.full_name || t('members.notUpdated')}</Text>
            </div>
            <div>
              <Text strong>{t('members.status')}: </Text>
              <Tag 
                color={record?.status === 1 ? 'green' : 'red'}
                icon={record?.status === 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              >
                {record?.status === 1 ? t('members.active') : t('members.inactive')}
              </Tag>
            </div>
          </Space>
        </div>

        <div>
          <Title level={4}>
            <CalendarOutlined /> {t('members.systemInfo')}
          </Title>
          <Space direction="vertical" size="small">
            <div>
              <Text strong>{t('members.createdAt')}: </Text>
              <Text>{record?.created_at ? new Date(record.created_at).toLocaleString() : 'N/A'}</Text>
            </div>
            <div>
              <Text strong>{t('members.lastUpdated')}: </Text>
              <Text>{record?.updated_at ? new Date(record.updated_at).toLocaleString() : 'N/A'}</Text>
            </div>
            <div>
              <Text strong>ID: </Text>
              <Text code>{record?.id}</Text>
            </div>
          </Space>
        </div>
      </Space>
    </Show>
  );
}

interface ShowMemberPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function ShowMemberPage({ params }: ShowMemberPageProps) {
  const { locale, id } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <ShowMemberContent id={id} />
    </AdminLayout>
  );
}
