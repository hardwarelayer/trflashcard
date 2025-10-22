import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function DashboardRedirect() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  
  // Extract locale from pathname or default to 'vi'
  const locale = pathname.split('/')[1] || 'vi'
  
  redirect(`/${locale}/dashboard`)
}
