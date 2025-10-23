"use client";

import { List, useTable, EditButton, DeleteButton, ShowButton, CreateButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";

interface MembersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function MembersPage({ params }: MembersPageProps) {
  const { locale } = use(params);
  
  const { tableProps } = useTable({
    resource: "demo_member",
    meta: {
      select: "id, username, full_name, status, created_at, updated_at",
      order: "created_at.desc"
    }
  });

  return (
    <AdminLayout locale={locale}>
      <List
        headerButtons={[
          <CreateButton key="create" />,
        ]}
        title="👥 Quản lý Members"
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
            `${range[0]}-${range[1]} của ${total} members`,
        }}
      >
        <Table.Column
          dataIndex="username"
          title="Username"
          render={(value) => (
            <Space>
              <UserOutlined />
              {value}
            </Space>
          )}
        />
        <Table.Column
          dataIndex="full_name"
          title="Họ tên"
        />
        <Table.Column
          dataIndex="status"
          title="Trạng thái"
          render={(value) => (
            <span style={{ 
              color: value === 1 ? '#52c41a' : '#ff4d4f',
              fontWeight: 'bold'
            }}>
              {value === 1 ? 'Hoạt động' : 'Không hoạt động'}
            </span>
          )}
        />
        <Table.Column
          dataIndex="created_at"
          title="Ngày tạo"
          render={(value) => new Date(value).toLocaleDateString('vi-VN')}
        />
        <Table.Column
          title="Thao tác"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
    </AdminLayout>
  );
}
