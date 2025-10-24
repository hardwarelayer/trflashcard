import { Metadata } from 'next';
import { getAppName } from './get-app-name';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const appName = await getAppName();
    
    return {
      title: appName,
      description: "Turkish Flashcard Learning System",
      icons: {
        icon: "/favicon.ico",
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback to environment variables
    return {
      title: process.env.NEXT_PUBLIC_APP_NAME || "TR Flashcard",
      description: "Turkish Flashcard Learning System",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}
