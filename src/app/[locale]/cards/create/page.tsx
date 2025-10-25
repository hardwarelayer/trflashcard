"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { supabaseBrowserClient as supabase } from "../../../../../lib/supabase/client";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

function CreateCardContent() {
  const t = useTranslations();
  
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
    <Create
      title={t('cards.create')}
      saveButtonProps={saveButtonProps}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t('cards.cardTitle')}
          name="title"
          rules={[
            { required: true, message: t('cards.titleRequired') },
            { min: 3, message: t('cards.titleMinLength') },
            { max: 100, message: t('cards.titleMaxLength') }
          ]}
        >
          <Input placeholder={t('cards.titlePlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('cards.content')}
          name="content"
          rules={[
            { required: true, message: t('cards.contentRequired') },
            { min: 10, message: t('cards.contentMinLength') }
          ]}
        >
          <Input.TextArea 
            placeholder={t('cards.contentPlaceholder')} 
            rows={4}
          />
        </Form.Item>

        <Form.Item
          label={t('cards.member')}
          name="member_id"
          rules={[
            { required: true, message: t('cards.memberRequired') }
          ]}
        >
          <Select
            placeholder={t('cards.member')}
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
  );
}

interface CreateCardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CreateCardPage({ params }: CreateCardPageProps) {
  const { locale } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <CreateCardContent />
    </AdminLayout>
  );
}
