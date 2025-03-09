// src/app/(app)/layout.tsx
"use client";

import React from "react";
import Navigation from "../../components/Navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-nextjs-gray-1">
      <Navigation />

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar - versão desktop (fixa) */}
        <div className="hidden md:block w-64 border-r border-nextjs-gray-2 bg-nextjs-white p-4">
          <nav className="space-y-2 sticky top-20">
            {/* Conteúdo da sidebar será fornecido pelo componente Navigation */}
          </nav>
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
