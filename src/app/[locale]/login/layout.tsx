import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

interface LoginLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LoginLayout({ children, params }: LoginLayoutProps) {
  const { locale } = await params;
  
  // Load messages for specific locale
  const messages = (await import(`../../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}