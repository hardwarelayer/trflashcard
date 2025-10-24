import { getTranslations } from 'next-intl/server';

interface TestDashboardProps {
  params: Promise<{ locale: string }>;
}

export default async function TestDashboard({ params }: TestDashboardProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎉 {t('title')}</h1>
      <p>This is a test dashboard with translations.</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Translations Test:</h2>
        <ul>
          <li>Total Members: {t('totalMembers')}</li>
          <li>Total Cards: {t('totalCards')}</li>
          <li>Recent Members: {t('recentMembers')}</li>
          <li>Recent Cards: {t('recentCards')}</li>
        </ul>
      </div>
    </div>
  );
}
