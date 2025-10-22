"use client";

import { NextIntlClientProvider } from "next-intl";

interface SimpleRefineWrapperProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export default function SimpleRefineWrapper({ children, locale, messages }: SimpleRefineWrapperProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div style={{ padding: '20px', border: '2px solid #ccc', margin: '10px' }}>
        <h3>Simple Refine Wrapper</h3>
        <p>Locale: {locale}</p>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
