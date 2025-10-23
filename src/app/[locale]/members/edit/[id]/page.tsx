"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";

interface EditMemberPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  const { locale, id } = use(params);
  
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "demo_member",
    id: id,
    redirect: "list"
  });

  const memberData = queryResult?.data?.data;

  return (
    <AdminLayout locale={locale}>
      <Edit
        title="Chỉnh sửa Member"
        saveButtonProps={saveButtonProps}
      >
      <Form {...formProps} layout="vertical" form={formProps.form}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập username!" },
            { min: 3, message: "Username phải có ít nhất 3 ký tự!" },
            { max: 50, message: "Username không được quá 50 ký tự!" }
          ]}
        >
          <Input placeholder="Nhập username" />
        </Form.Item>

        <Form.Item
          label="Password mới"
          name="new_password"
          rules={[
            { min: 6, message: "Password phải có ít nhất 6 ký tự!" }
          ]}
        >
          <Input.Password 
            placeholder="Nhập password mới (để trống nếu không muốn thay đổi)" 
          />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="full_name"
          rules={[
            { max: 100, message: "Họ tên không được quá 100 ký tự!" }
          ]}
        >
          <Input placeholder="Nhập họ tên đầy đủ" />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          valuePropName="checked"
          getValueFromEvent={(checked) => checked ? 1 : 0}
          getValueProps={(value) => ({ checked: value === 1 })}
        >
          <Switch 
            checkedChildren="Hoạt động" 
            unCheckedChildren="Không hoạt động" 
          />
        </Form.Item>
      </Form>
    </Edit>
    </AdminLayout>
  );
}
