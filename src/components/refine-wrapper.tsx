"use client";

import { DevtoolsProvider } from "@providers/devtools";
import { useNotificationProvider } from "@refinedev/antd";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProvider } from "@providers/auth-provider/supabase-auth-provider.client";
import { dataProvider } from "@providers/data-provider";
import "@refinedev/antd/dist/reset.css";

interface RefineWrapperProps {
  children: React.ReactNode;
}

export default function RefineWrapper({ children }: RefineWrapperProps) {
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
          <ColorModeContextProvider defaultMode="light">
            <DevtoolsProvider>
              <GitHubBanner />
              <Refine
                routerProvider={routerProvider}
                authProvider={authProvider}
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/dashboard",
                    meta: {
                      label: "Dashboard",
                      icon: "🏠",
                    },
                  },
                  {
                    name: "members",
                    list: "/members",
                    create: "/members/create",
                    edit: "/members/edit/:id",
                    show: "/members/show/:id",
                    meta: {
                      label: "Members",
                      icon: "👥",
                      canDelete: true,
                    },
                  },
                  {
                    name: "cards",
                    list: "/cards",
                    create: "/cards/create",
                    edit: "/cards/edit/:id",
                    show: "/cards/show/:id",
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
        </AntdRegistry>
      </RefineKbarProvider>
    </QueryClientProvider>
  );
}
