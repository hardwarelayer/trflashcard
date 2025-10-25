"use client";

import { List, useTable, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Space, Button, Popconfirm } from "antd";
import { UserOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useTranslations } from 'next-intl';
import { useDelete } from "@refinedev/core";

function MembersContent() {
  const t = useTranslations();
  const { mutate: deleteMember } = useDelete();
  
  const { tableProps } = useTable({
    resource: "demo_member",
    meta: {
      select: "id, username, full_name, status, created_at, updated_at",
      order: "created_at.desc"
    }
  });

  const handleDelete = (id: string) => {
    deleteMember({
      resource: "demo_member",
      id: id,
    });
  };

  return (
        <List
          headerButtons={[
            <Button 
              key="create" 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => window.location.href = `/${locale}/members/create`}
            >
              {t('members.create')}
            </Button>,
          ]}
          title={`👥 ${t('members.title')}`}
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
            `${range[0]}-${range[1]} ${t('members.pagination')} ${total} members`,
        }}
      >
        <Table.Column
          dataIndex="username"
          title={t('members.username')}
          render={(value) => (
            <Space>
              <UserOutlined />
              {value}
            </Space>
          )}
        />
        <Table.Column
          dataIndex="full_name"
          title={t('members.fullName')}
        />
        <Table.Column
          dataIndex="status"
          title={t('members.status')}
          render={(value) => (
            <span style={{ 
              color: value === 1 ? '#52c41a' : '#ff4d4f',
              fontWeight: 'bold'
            }}>
              {value === 1 ? t('members.active') : t('members.inactive')}
            </span>
          )}
        />
        <Table.Column
          dataIndex="created_at"
          title={t('members.createdAt')}
          render={(value) => new Date(value).toLocaleDateString()}
        />
        <Table.Column
          title={t('members.actions')}
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

interface MembersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function MembersPage({ params }: MembersPageProps) {
  const { locale } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <MembersContent />
    </AdminLayout>
  );
}
