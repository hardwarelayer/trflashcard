import { notFound } from 'next/navigation'
import RefineWrapper from '@components/refine-wrapper'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const locales = ['vi', 'en']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  // Await params before using
  const { locale } = await params
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return (
    <RefineWrapper>
      <div style={{ margin: 0, padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>🌍 Locale: {locale}</h2>
        {children}
      </div>
    </RefineWrapper>
  )
}
