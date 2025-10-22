import LoginLayout from "@/components/layout/login-layout";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayoutPage({ children }: LoginLayoutProps) {
  return (
    <LoginLayout>
      {children}
    </LoginLayout>
  );
}
