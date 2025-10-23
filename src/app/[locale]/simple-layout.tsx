interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function SimpleLocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  
  return (
    <div>
      <h1>Simple Layout - Locale: {locale}</h1>
      {children}
    </div>
  )
}
