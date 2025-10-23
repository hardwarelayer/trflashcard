"use client";

import { Card, Row, Col, Form, Input, Button, Switch, Select, Space, message } from "antd";
import { SettingOutlined, SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";
import { useState, useEffect } from "react";
import { supabaseBrowserClient as supabase } from "../../../../lib/supabase/client";

interface SettingsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = use(params);
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

      message.success('Settings saved successfully!');
    } catch (error: any) {
      console.error('Error saving settings:', error);
      
      if (error?.code === '42501') {
        message.error('Permission denied. Please check RLS policies for demo_system_config table.');
      } else if (error?.code === 'PGRST204') {
        message.error('Database schema error. Please check table structure.');
      } else if (error?.code === '42703') {
        message.error('Database field error. Please check table schema.');
      } else {
        message.error('Failed to save settings. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <AdminLayout locale={locale}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', margin: 0 }}>
            <SettingOutlined /> System Settings
          </h1>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              Reset
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Settings
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
              <Card title="📱 General Settings" style={{ marginBottom: '24px' }}>
                <Form.Item
                  label="Application Name"
                  name="app_name"
                  rules={[{ required: true, message: 'Please enter application name!' }]}
                >
                  <Input placeholder="Enter application name" />
                </Form.Item>

                <Form.Item
                  label="Application Version"
                  name="app_version"
                  rules={[{ required: true, message: 'Please enter application version!' }]}
                >
                  <Input placeholder="Enter application version" />
                </Form.Item>

                <Form.Item
                  label="Default Language"
                  name="default_language"
                >
                  <Select>
                    <Select.Option value="vi">Tiếng Việt</Select.Option>
                    <Select.Option value="en">English</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Maintenance Mode"
                  name="maintenance_mode"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Card>
            </Col>

            {/* Limits Settings */}
            <Col span={12}>
              <Card title="📊 Limits & Quotas" style={{ marginBottom: '24px' }}>
                <Form.Item
                  label="Maximum Members"
                  name="max_members"
                  rules={[{ required: true, message: 'Please enter maximum members!' }]}
                >
                  <Input type="number" placeholder="Enter maximum members" />
                </Form.Item>

                <Form.Item
                  label="Max Cards per Member"
                  name="max_cards_per_member"
                  rules={[{ required: true, message: 'Please enter max cards per member!' }]}
                >
                  <Input type="number" placeholder="Enter max cards per member" />
                </Form.Item>
              </Card>
            </Col>

            {/* Notification Settings */}
            <Col span={12}>
              <Card title="🔔 Notifications" style={{ marginBottom: '24px' }}>
                <Form.Item
                  label="Email Notifications"
                  name="email_notifications"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Card>
            </Col>

            {/* Backup Settings */}
            <Col span={12}>
              <Card title="💾 Backup & Recovery" style={{ marginBottom: '24px' }}>
                <Form.Item
                  label="Auto Backup"
                  name="auto_backup"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="Backup Frequency"
                  name="backup_frequency"
                >
                  <Select>
                    <Select.Option value="hourly">Hourly</Select.Option>
                    <Select.Option value="daily">Daily</Select.Option>
                    <Select.Option value="weekly">Weekly</Select.Option>
                    <Select.Option value="monthly">Monthly</Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </AdminLayout>
  );
}
