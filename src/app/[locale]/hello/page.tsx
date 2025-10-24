import { getTranslations } from 'next-intl/server';

interface HelloPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HelloPage({ params }: HelloPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  
  return (
    <div>
      <h1>Hello World!</h1>
      <p>This is the simplest possible page.</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Translation Test:</h3>
        <p>Title: {t('title')}</p>
        <p>Total Members: {t('totalMembers')}</p>
        <p>Total Cards: {t('totalCards')}</p>
      </div>
    </div>
  );
}
