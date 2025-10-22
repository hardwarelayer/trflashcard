"use client";

import { List, useTable, EditButton, DeleteButton, ShowButton, CreateButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import { BookOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";

interface CardsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CardsPage({ params }: CardsPageProps) {
  const { locale } = use(params);
  
  const { tableProps } = useTable({
    resource: "demo_card",
    meta: {
      select: "id, title, content, member_id, created_at, updated_at",
      order: "created_at.desc"
    }
  });

  return (
    <AdminLayout locale={locale}>
      <List
        headerButtons={[
          <CreateButton key="create" />,
        ]}
        title="📚 Quản lý Cards"
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
              `${range[0]}-${range[1]} của ${total} cards`,
          }}
        >
          <Table.Column
            dataIndex="title"
            title="Tiêu đề"
            render={(value) => (
              <Space>
                <BookOutlined />
                {value}
              </Space>
            )}
          />
          <Table.Column
            dataIndex="content"
            title="Nội dung"
            ellipsis={true}
            render={(value) => (
              <span title={value}>
                {value?.length > 50 ? `${value.substring(0, 50)}...` : value}
              </span>
            )}
          />
          <Table.Column
            dataIndex="member_id"
            title="Member ID"
            render={(value) => (
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {value?.substring(0, 8)}...
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