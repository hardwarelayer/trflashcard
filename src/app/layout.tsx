import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import RefineWrapper from "@components/refine-wrapper";
import { generateMetadata } from "@/lib/generate-metadata";
import "@/lib/suppress-warnings";

export { generateMetadata };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
