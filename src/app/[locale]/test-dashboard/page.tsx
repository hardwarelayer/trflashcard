"use client";

import { useTranslations } from "next-intl";

export default function TestDashboard() {
  const t = useTranslations('dashboard');
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎉 {t('title')}</h1>
      <p>This is a test dashboard with translations.</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Translations Test:</h2>
        <ul>
          <li>Total Members: {t('totalMembers')}</li>
          <li>Total Cards: {t('totalCards')}</li>
          <li>Members: {t('members')}</li>
          <li>Cards: {t('cards')}</li>
        </ul>
      </div>
    </div>
  );
}
