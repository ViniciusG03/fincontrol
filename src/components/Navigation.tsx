// src/components/Navigation.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Importe ícones do Heroicons ou qualquer biblioteca de sua preferência
// Simulando os ícones com tipos para este exemplo
type IconProps = {
  className?: string;
};

const HomeIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChartIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 19V13M15 19V5M21 21H3M3 10L9 4L15 10L21 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WalletIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 11V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V11ZM19 11H14M14 11C12.8954 11 12 11.8954 12 13C12 14.1046 12.8954 15 14 15H19V11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Definição de tipos para links de navegação
interface NavLink {
  name: string;
  path: string;
  icon: React.ComponentType<IconProps>;
}

const navLinks: NavLink[] = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Transações", path: "/transactions", icon: WalletIcon },
  { name: "Relatórios", path: "/reports", icon: ChartIcon },
  { name: "Configurações", path: "/settings", icon: SettingsIcon },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Verificar se o link está ativo
  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  // Fechar menu ao mudar de rota em dispositivos móveis
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Navbar superior */}
      <header className="sticky top-0 z-10 bg-nextjs-white border-b border-nextjs-gray-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo e botão de menu mobile */}
            <div className="flex items-center">
              <button
                className="inline-flex md:hidden mr-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? (
                  <span className="h-6 w-6">✕</span>
                ) : (
                  <span className="h-6 w-6">☰</span>
                )}
              </button>
              <Link href="/dashboard" className="flex items-center">
                <span className="text-nextjs-blue font-bold text-xl">
                  FinControl
                </span>
              </Link>
            </div>

            {/* Links de navegação - versão desktop */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link href={link.path} key={link.path}>
                  <span
                    className={`text-sm font-medium transition-colors hover:text-nextjs-blue ${
                      isActive(link.path)
                        ? "text-nextjs-blue"
                        : "text-nextjs-gray-5"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Perfil do usuário */}
            <div className="flex items-center">
              <button className="rounded-full h-8 w-8 bg-nextjs-gray-2 flex items-center justify-center text-nextjs-gray-5">
                <span className="text-sm">U</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - versão mobile (overlay) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-nextjs-white p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link href={link.path} key={`mobile-${link.path}`}>
                  <span
                    className={`flex items-center px-3 py-2 rounded-nextjs transition-colors ${
                      isActive(link.path)
                        ? "bg-nextjs-blue-lighter text-nextjs-blue"
                        : "text-nextjs-gray-5 hover:bg-nextjs-gray-1"
                    }`}
                  >
                    <link.icon className="h-5 w-5 mr-3" />
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
