import { redirect } from 'next/navigation'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  // Redirect to dashboard with current locale
  redirect(`/${locale}/dashboard`)
}
