"use client";

import { Card, Row, Col, Form, Input, Button, Switch, Select, Space, message } from "antd";
import { SettingOutlined, SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useState, useEffect } from "react";
import { supabaseBrowserClient as supabase } from "../../../../lib/supabase/client";
import { useTranslations } from 'next-intl';

function SettingsContent() {
  const t = useTranslations();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  // Load settings from database
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('demo_system_config')
          .select('*');

        if (error) {
          console.error('Error fetching settings:', error);
          return;
        }

        if (data && data.length > 0) {
          // Convert array of configs to object
          const configObj = data.reduce((acc: any, item: any) => {
            acc[item.config_key] = item.config_value;
            return acc;
          }, {});

          setSettings(configObj);
          form.setFieldsValue({
            app_name: configObj.app_name || 'TR Flashcard',
            app_version: configObj.app_version || '1.0.0',
            maintenance_mode: configObj.maintenance_mode === 'true',
            max_members: parseInt(configObj.max_members) || 1000,
            max_cards_per_member: parseInt(configObj.max_cards_per_member) || 100,
            default_language: configObj.default_language || 'vi',
            email_notifications: configObj.email_notifications === 'true',
            auto_backup: configObj.auto_backup === 'true',
            backup_frequency: configObj.backup_frequency || 'daily'
          });
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchSettings();
  }, [form]);

  const handleSave = async (values: any) => {
    try {
      setLoading(true);
      
      // Convert form values to config array
      const configs = [
        { config_key: 'app_name', config_value: values.app_name },
        { config_key: 'app_version', config_value: values.app_version },
        { config_key: 'maintenance_mode', config_value: values.maintenance_mode.toString() },
        { config_key: 'max_members', config_value: values.max_members.toString() },
        { config_key: 'max_cards_per_member', config_value: values.max_cards_per_member.toString() },
        { config_key: 'default_language', config_value: values.default_language },
        { config_key: 'email_notifications', config_value: values.email_notifications.toString() },
        { config_key: 'auto_backup', config_value: values.auto_backup.toString() },
        { config_key: 'backup_frequency', config_value: values.backup_frequency }
      ];

           // Insert/Update each config - sử dụng insert/update thay vì upsert
           for (const config of configs) {
             // Kiểm tra xem config đã tồn tại chưa
             const { data: existingConfig, error: selectError } = await supabase
               .from('demo_system_config')
               .select('id')
               .eq('config_key', config.config_key)
               .maybeSingle();

             if (existingConfig) {
               // Update existing config
               const { error } = await supabase
                 .from('demo_system_config')
                 .update({ 
                   config_value: config.config_value,
                   updated_at: new Date().toISOString()
                 })
                 .eq('config_key', config.config_key);
               
               if (error) throw error;
             } else {
               // Insert new config
               const { error } = await supabase
                 .from('demo_system_config')
                 .insert({
                   config_key: config.config_key,
                   config_value: config.config_value,
                   updated_at: new Date().toISOString()
                 });
               
               if (error) throw error;
             }
           }

      message.success(t('settings.saveSuccess'));
    } catch (error: any) {
      console.error('Error saving settings:', error);
      
      if (error?.code === '42501') {
        message.error(t('settings.permissionDenied'));
      } else if (error?.code === 'PGRST204') {
        message.error(t('settings.schemaError'));
      } else if (error?.code === '42703') {
        message.error(t('settings.fieldError'));
      } else {
        message.error(t('settings.saveError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  if (!settings) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div>{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>
          <SettingOutlined /> {t('settings.title')}
        </h1>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            {t('settings.reset')}
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            loading={loading}
            onClick={() => form.submit()}
          >
            {t('settings.save')}
          </Button>
        </Space>
      </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            app_name: 'TR Flashcard',
            app_version: '1.0.0',
            maintenance_mode: false,
            max_members: 1000,
            max_cards_per_member: 100,
            default_language: 'vi',
            email_notifications: false,
            auto_backup: false,
            backup_frequency: 'daily'
          }}
        >
          <Row gutter={24}>
            {/* General Settings */}
            <Col span={12}>
              <Card title={`📱 ${t('settings.generalSettings')}`} style={{ marginBottom: '24px' }}>
                <Form.Item
                  label={t('settings.appName')}
                  name="app_name"
                  rules={[{ required: true, message: t('settings.appNameRequired') }]}
                >
                  <Input placeholder={t('settings.appNamePlaceholder')} />
                </Form.Item>

                <Form.Item
                  label={t('settings.appVersion')}
                  name="app_version"
                  rules={[{ required: true, message: t('settings.appVersionRequired') }]}
                >
                  <Input placeholder={t('settings.appVersionPlaceholder')} />
                </Form.Item>

                <Form.Item
                  label={t('settings.defaultLanguage')}
                  name="default_language"
                >
                  <Select>
                    <Select.Option value="vi">{t('settings.vietnamese')}</Select.Option>
                    <Select.Option value="en">{t('settings.english')}</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={t('settings.maintenanceMode')}
                  name="maintenance_mode"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Card>
            </Col>

            {/* Limits Settings */}
            <Col span={12}>
              <Card title={`📊 ${t('settings.limitsQuotas')}`} style={{ marginBottom: '24px' }}>
                <Form.Item
                  label={t('settings.maxMembers')}
                  name="max_members"
                  rules={[{ required: true, message: t('settings.maxMembersRequired') }]}
                >
                  <Input type="number" placeholder={t('settings.maxMembersPlaceholder')} />
                </Form.Item>

                <Form.Item
                  label={t('settings.maxCardsPerMember')}
                  name="max_cards_per_member"
                  rules={[{ required: true, message: t('settings.maxCardsRequired') }]}
                >
                  <Input type="number" placeholder={t('settings.maxCardsPlaceholder')} />
                </Form.Item>
              </Card>
            </Col>

            {/* Notification Settings */}
            <Col span={12}>
              <Card title={`🔔 ${t('settings.notifications')}`} style={{ marginBottom: '24px' }}>
                <Form.Item
                  label={t('settings.emailNotifications')}
                  name="email_notifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Card>
            </Col>

            {/* Backup Settings */}
            <Col span={12}>
              <Card title={`💾 ${t('settings.backupRecovery')}`} style={{ marginBottom: '24px' }}>
                <Form.Item
                  label={t('settings.autoBackup')}
                  name="auto_backup"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={t('settings.backupFrequency')}
                  name="backup_frequency"
                >
                  <Select>
                    <Select.Option value="hourly">{t('settings.hourly')}</Select.Option>
                    <Select.Option value="daily">{t('settings.daily')}</Select.Option>
                    <Select.Option value="weekly">{t('settings.weekly')}</Select.Option>
                    <Select.Option value="monthly">{t('settings.monthly')}</Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    );
}

interface SettingsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <SettingsContent />
    </AdminLayout>
  );
}
