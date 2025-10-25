"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Button } from "antd";
import { SaveOutlined, DeleteOutlined, ReloadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { supabaseBrowserClient as supabase } from "../../../../../../lib/supabase/client";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { useDelete } from "@refinedev/core";
import { useRouter } from "next/navigation";

function EditCardContent({ id }: { id: string }) {
  const t = useTranslations();
  const router = useRouter();
  const { mutate: deleteCard } = useDelete();
  
  const { formProps, saveButtonProps } = useForm({
    resource: "demo_card",
    id: id,
    redirect: "list"
  });

  const handleDelete = () => {
    deleteCard({
      resource: "demo_card",
      id: id,
    });
  };

  const handleBack = () => {
    router.back();
  };

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
    <Edit
      title={t('cards.edit')}
      saveButtonProps={saveButtonProps}
      headerButtons={[
        <Button 
          key="back" 
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
        >
          {t('common.back')}
        </Button>,
      ]}
      footerButtons={[
        <Button 
          key="refresh" 
          icon={<ReloadOutlined />}
          onClick={() => window.location.reload()}
        >
          {t('common.refresh')}
        </Button>,
        <Button 
          key="delete" 
          danger 
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        >
          {t('common.delete')}
        </Button>,
      ]}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t('cards.titleLabel')}
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
          label={t('cards.contentLabel')}
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
          label={t('cards.memberLabel')}
          name="member_id"
          rules={[
            { required: true, message: t('cards.memberRequired') }
          ]}
        >
          <Select
            placeholder={t('cards.memberPlaceholder')}
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
    </Edit>
  );
}

interface EditCardPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function EditCardPage({ params }: EditCardPageProps) {
  const { locale, id } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <EditCardContent id={id} />
    </AdminLayout>
  );
}
