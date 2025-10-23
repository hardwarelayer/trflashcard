"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { supabaseBrowserClient as supabase } from "../../../../../lib/supabase/client";
import { useEffect, useState } from "react";

interface CreateCardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CreateCardPage({ params }: CreateCardPageProps) {
  const { locale } = use(params);
  
  const { formProps, saveButtonProps } = useForm({
    resource: "demo_card",
    redirect: "list"
  });

  // Sử dụng direct Supabase client thay vì Refine hooks
  const [membersData, setMembersData] = useState<any[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState<any>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setMembersLoading(true);
        setMembersError(null);
        
        const { data, error } = await supabase
          .from('demo_member')
          .select('id, username, full_name')
          .order('created_at', { ascending: false });

        if (error) {
          setMembersError(error);
        } else {
          setMembersData(data || []);
        }
      } catch (err) {
        setMembersError(err);
      } finally {
        setMembersLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const membersOptions = membersData?.map((member: any) => ({
    label: `${member.username}${member.full_name ? ` (${member.full_name})` : ''}`,
    value: member.id
  })) || [];

  return (
    <AdminLayout locale={locale}>
      <Create
        title="Tạo Card mới"
        saveButtonProps={saveButtonProps}
      >
        <Form {...formProps} layout="vertical" form={formProps.form}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề!" },
              { min: 3, message: "Tiêu đề phải có ít nhất 3 ký tự!" },
              { max: 200, message: "Tiêu đề không được quá 200 ký tự!" }
            ]}
          >
            <Input placeholder="Nhập tiêu đề card" />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung!" },
              { min: 10, message: "Nội dung phải có ít nhất 10 ký tự!" }
            ]}
          >
            <Input.TextArea 
              placeholder="Nhập nội dung card" 
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="Member"
            name="member_id"
            rules={[
              { required: true, message: "Vui lòng chọn member!" }
            ]}
          >
            <Select
              placeholder="Chọn member"
              showSearch
              loading={membersLoading}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={membersOptions}
            />
          </Form.Item>
        </Form>
      </Create>
    </AdminLayout>
  );
}
