import { getRequestConfig } from 'next-intl/server'

const locales = ['vi', 'en']

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    // Default to 'vi' if invalid locale
    return {
      locale: 'vi',
      messages: (await import(`../messages/vi.json`)).default
    }
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
