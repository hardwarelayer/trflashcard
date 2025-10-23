"use client";

import { useTranslations } from 'next-intl';

export default function HelloPage() {
  const t = useTranslations('dashboard');
  
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
