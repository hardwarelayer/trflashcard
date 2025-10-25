"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useTranslations } from 'next-intl';

function CreateMemberContent() {
  const t = useTranslations();
  const { formProps, saveButtonProps } = useForm({
    resource: "demo_member",
    redirect: "list"
  });

  return (
    <Create
      title={t('members.create')}
      saveButtonProps={saveButtonProps}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t('members.username')}
          name="username"
          rules={[
            { required: true, message: t('members.usernameRequired') },
            { min: 3, message: t('members.usernameMinLength') },
            { max: 50, message: t('members.usernameMaxLength') }
          ]}
        >
          <Input placeholder={t('members.usernamePlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('members.password')}
          name="password"
          rules={[
            { required: true, message: t('members.passwordRequired') },
            { min: 6, message: t('members.passwordMinLength') }
          ]}
        >
          <Input.Password placeholder={t('members.passwordPlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('members.fullName')}
          name="full_name"
          rules={[
            { max: 100, message: t('members.fullNameMaxLength') }
          ]}
        >
          <Input placeholder={t('members.fullNamePlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('members.statusLabel')}
          name="status"
          valuePropName="checked"
          getValueFromEvent={(checked) => checked ? 1 : 0}
          getValueProps={(value) => ({ checked: value === 1 })}
        >
          <Switch 
            checkedChildren={t('members.activeLabel')} 
            unCheckedChildren={t('members.inactiveLabel')} 
          />
        </Form.Item>
      </Form>
    </Create>
  );
}

interface CreateMemberPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function CreateMemberPage({ params }: CreateMemberPageProps) {
  const { locale } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <CreateMemberContent />
    </AdminLayout>
  );
}
