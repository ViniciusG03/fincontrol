// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "FinControl - Gerenciamento Financeiro Pessoal",
  description: "Gerencie suas finanças pessoais com facilidade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-nextjs-gray-1">{children}</body>
    </html>
  );
}
