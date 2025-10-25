"use client";

import { DevtoolsProvider } from "@providers/devtools";
import { useNotificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StyleProvider } from '@ant-design/cssinjs';
import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProvider } from "@providers/auth-provider/supabase-auth-provider.client";
import { dataProvider } from "@providers/data-provider";
import { Layout } from "antd";
import Sidebar from "@/components/navigation/sidebar";
import "@refinedev/antd/dist/reset.css";

const { Content } = Layout;

interface RefineWrapperProps {
  children: React.ReactNode;
  locale?: string;
}

export default function RefineWrapper({ children, locale = 'vi' }: RefineWrapperProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RefineKbarProvider>
        <AntdRegistry>
          <StyleProvider hashPriority="high">
            <ColorModeContextProvider defaultMode="light">
            <DevtoolsProvider>
              <Refine
                routerProvider={routerProvider}
                authProvider={authProvider}
                dataProvider={{
                  default: dataProvider
                }}
                notificationProvider={useNotificationProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: `/${locale}/dashboard`,
                    meta: {
                      label: "Dashboard",
                      icon: "🏠",
                    },
                  },
                  {
                    name: "demo_member",
                    list: `/${locale}/members`,
                    create: `/${locale}/members/create`,
                    edit: `/${locale}/members/edit/:id`,
                    show: `/${locale}/members/show/:id`,
                    meta: {
                      label: "Members",
                      icon: "👥",
                      canDelete: true,
                    },
                  },
                  {
                    name: "demo_card",
                    list: `/${locale}/cards`,
                    create: `/${locale}/cards/create`,
                    edit: `/${locale}/cards/edit/:id`,
                    show: `/${locale}/cards/show/:id`,
                    meta: {
                      label: "Cards",
                      icon: "📚",
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "ayjlkq-ZnysS9-19Oams",
                }}
              >
                {children}
                <RefineKbar />
              </Refine>
            </DevtoolsProvider>
          </ColorModeContextProvider>
          </StyleProvider>
        </AntdRegistry>
      </RefineKbarProvider>
    </QueryClientProvider>
  );
}
