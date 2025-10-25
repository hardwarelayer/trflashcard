import { redirect } from 'next/navigation'

export default function LoginRedirect() {
  // Redirect to Vietnamese login page
  redirect('/vi/login')
}
