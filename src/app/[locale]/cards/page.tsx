"use client";

import { List, useTable, EditButton, ShowButton, CreateButton } from "@refinedev/antd";
import { Table, Space, Button, Popconfirm } from "antd";
import { BookOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useTranslations } from 'next-intl';
import { useDelete } from "@refinedev/core";

function CardsContent() {
  const t = useTranslations();
  const { mutate: deleteCard } = useDelete();
  
  const { tableProps } = useTable({
    resource: "demo_card",
    meta: {
      select: "id, title, content, member_id, created_at, updated_at",
      order: "created_at.desc"
    }
  });

  const handleDelete = (id: string) => {
    deleteCard({
      resource: "demo_card",
      id: id,
    });
  };

  return (
    <List
      headerButtons={[
        <CreateButton key="create" />,
      ]}
      title={`📚 ${t('cards.title')}`}
    >
      <Table
        {...tableProps}
        rowKey="id"
        scroll={{ x: true }}
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} ${t('cards.pagination')} ${total} cards`,
        }}
      >
        <Table.Column
          dataIndex="title"
          title={t('cards.cardTitle')}
          render={(value) => (
            <Space>
              <BookOutlined />
              {value}
            </Space>
          )}
        />
        <Table.Column
          dataIndex="content"
          title={t('cards.content')}
          ellipsis={true}
          render={(value) => (
            <span title={value}>
              {value?.length > 50 ? `${value.substring(0, 50)}...` : value}
            </span>
          )}
        />
        <Table.Column
          dataIndex="member_id"
          title={t('cards.memberId')}
          render={(value) => (
            <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
              {value?.substring(0, 8)}...
            </span>
          )}
        />
        <Table.Column
          dataIndex="created_at"
          title={t('cards.createdAt')}
          render={(value) => new Date(value).toLocaleDateString()}
        />
        <Table.Column
          title={t('cards.actions')}
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <Popconfirm
                title={t('common.deleteConfirm')}
                onConfirm={() => handleDelete(record.id)}
                okText={t('common.yes')}
                cancelText={t('common.no')}
              >
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </List>
  );
}

interface CardsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CardsPage({ params }: CardsPageProps) {
  const { locale } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <CardsContent />
    </AdminLayout>
  );
}