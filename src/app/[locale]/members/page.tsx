"use client";

import AdminLayout from "@/components/layout/admin-layout";
import { use } from "react";

interface MembersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function MembersPage({ params }: MembersPageProps) {
  const { locale } = use(params);
  
  return (
    <AdminLayout locale={locale}>
      <div>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
          👥 Members Management
        </h1>
        
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          background: '#fff', 
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          <h2>🚧 Coming Soon</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Members CRUD functionality will be implemented here
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
