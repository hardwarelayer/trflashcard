"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useTranslations } from 'next-intl';

function EditMemberContent({ id }: { id: string }) {
  const t = useTranslations();
  
  const { formProps, saveButtonProps } = useForm({
    resource: "demo_member",
    id: id,
    redirect: "list"
  });


  return (
    <Edit
      title={t('members.edit')}
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
          label={t('members.newPassword')}
          name="new_password"
          rules={[
            { min: 6, message: t('members.newPasswordMinLength') }
          ]}
        >
          <Input.Password 
            placeholder={t('members.newPasswordPlaceholder')} 
          />
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
    </Edit>
  );
}

interface EditMemberPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  const { locale, id } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <EditMemberContent id={id} />
    </AdminLayout>
  );
}
