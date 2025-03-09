// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionamento do lado do cliente para o dashboard
    router.push("/dashboard");
  }, [router]);

  // Retorna um componente mínimo que será mostrado brevemente antes do redirecionamento
  return (
    <div className="flex items-center justify-center min-h-screen bg-nextjs-gray-1">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-nextjs-blue mb-2">FinControl</h1>
        <p className="text-nextjs-gray-4">Redirecionando para o dashboard...</p>
      </div>
    </div>
  );
}
