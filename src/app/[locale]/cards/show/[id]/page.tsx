"use client";

import { Show } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { Typography, Tag, Space } from "antd";
import { BookOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useTranslations } from 'next-intl';

const { Title, Text } = Typography;

function ShowCardContent({ id }: { id: string }) {
  const t = useTranslations();
  
  const { result: data, query } = useOne({
    resource: "demo_card",
    id: id
  });
  
  const isLoading = query.isLoading;

  const record = data?.data;

  return (
    <Show
      title={t('cards.show')}
      isLoading={isLoading}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4}>
            <BookOutlined /> {t('cards.basicInfo')}
          </Title>
          <Space direction="vertical" size="small">
            <div>
              <Text strong>{t('cards.titleField')}: </Text>
              <Text>{record?.title}</Text>
            </div>
            <div>
              <Text strong>{t('cards.contentField')}: </Text>
              <Text>{record?.content}</Text>
            </div>
            <div>
              <Text strong>{t('cards.memberIdField')}: </Text>
              <Text code>{record?.member_id}</Text>
            </div>
          </Space>
        </div>

        <div>
          <Title level={4}>
            <CalendarOutlined /> {t('cards.systemInfo')}
          </Title>
          <Space direction="vertical" size="small">
            <div>
              <Text strong>{t('cards.createdAt')}: </Text>
              <Text>{record?.created_at ? new Date(record.created_at).toLocaleString() : 'N/A'}</Text>
            </div>
            <div>
              <Text strong>{t('cards.lastUpdated')}: </Text>
              <Text>{record?.updated_at ? new Date(record.updated_at).toLocaleString() : 'N/A'}</Text>
            </div>
            <div>
              <Text strong>{t('cards.cardId')}: </Text>
              <Text code>{record?.id}</Text>
            </div>
          </Space>
        </div>
      </Space>
    </Show>
  );
}

interface ShowCardPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function ShowCardPage({ params }: ShowCardPageProps) {
  const { locale, id } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <ShowCardContent id={id} />
    </AdminLayout>
  );
}
