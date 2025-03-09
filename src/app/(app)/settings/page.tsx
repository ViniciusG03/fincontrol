// src/app/(app)/settings/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
"use client";

import React, { useState } from "react";
import { User, Account, Category } from "@/types";

// Interface para abas de configurações
interface SettingsTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

// Componente para o seletor de abas
const SettingsTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: SettingsTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) => {
  return (
    <div className="border-b border-nextjs-gray-2">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-nextjs-blue text-nextjs-blue"
                : "border-transparent text-nextjs-gray-4 hover:text-nextjs-gray-5 hover:border-nextjs-gray-3"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Componente para uma seção de configurações
interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <div className="py-6 border-b border-nextjs-gray-2 last:border-b-0">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-nextjs-black">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-nextjs-gray-4">{description}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
};

// Componente para um campo de configuração
interface SettingsFieldProps {
  label: string;
  htmlFor?: string;
  description?: string;
  children: React.ReactNode;
}

const SettingsField = ({
  label,
  htmlFor,
  description,
  children,
}: SettingsFieldProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div className="md:w-1/3">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-nextjs-black"
        >
          {label}
        </label>
        {description && (
          <p className="mt-1 text-sm text-nextjs-gray-4">{description}</p>
        )}
      </div>
      <div className="md:w-2/3">{children}</div>
    </div>
  );
};

// Componente de configurações do perfil
const ProfileSettings = () => {
  const [user, setUser] = useState<Partial<User>>({
    name: "João Silva",
    email: "joao.silva@email.com",
    avatar: "",
    currency: "BRL",
    language: "pt-BR",
    theme: "LIGHT",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Aqui você enviaria os dados para a API
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div>
      <SettingsSection
        title="Informações Pessoais"
        description="Atualize suas informações de perfil"
      >
        <SettingsField
          label="Foto de Perfil"
          description="Esta imagem aparecerá no seu perfil de usuário"
        >
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-nextjs-gray-2 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar do usuário"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-nextjs-gray-4 text-2xl">
                  {user.name?.charAt(0)}
                </span>
              )}
            </div>
            <button className="px-3 py-1.5 text-sm border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1">
              Alterar
            </button>
          </div>
        </SettingsField>

        <SettingsField
          label="Nome"
          htmlFor="name"
          description="Seu nome completo"
        >
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
            value={user.name || ""}
            onChange={handleChange}
          />
        </SettingsField>

        <SettingsField
          label="Email"
          htmlFor="email"
          description="Seu endereço de email"
        >
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
            value={user.email || ""}
            onChange={handleChange}
          />
        </SettingsField>
      </SettingsSection>

      <SettingsSection
        title="Preferências"
        description="Personalize sua experiência no aplicativo"
      >
        <SettingsField
          label="Moeda"
          htmlFor="currency"
          description="Moeda padrão para exibição de valores"
        >
          <select
            id="currency"
            name="currency"
            className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
            value={user.currency || "BRL"}
            onChange={handleChange}
          >
            <option value="BRL">Real Brasileiro (R$)</option>
            <option value="USD">Dólar Americano ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">Libra Esterlina (£)</option>
          </select>
        </SettingsField>

        <SettingsField
          label="Idioma"
          htmlFor="language"
          description="Idioma da interface do usuário"
        >
          <select
            id="language"
            name="language"
            className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
            value={user.language || "pt-BR"}
            onChange={handleChange}
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="es">Español</option>
          </select>
        </SettingsField>

        <SettingsField
          label="Tema"
          htmlFor="theme"
          description="Escolha entre tema claro ou escuro"
        >
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="LIGHT"
                checked={user.theme === "LIGHT"}
                onChange={handleChange}
                className="h-4 w-4 border-nextjs-gray-2 text-nextjs-blue focus:ring-nextjs-blue-light"
              />
              <span className="ml-2 text-sm">Claro</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="DARK"
                checked={user.theme === "DARK"}
                onChange={handleChange}
                className="h-4 w-4 border-nextjs-gray-2 text-nextjs-blue focus:ring-nextjs-blue-light"
              />
              <span className="ml-2 text-sm">Escuro</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="SYSTEM"
                checked={user.theme === "SYSTEM"}
                onChange={handleChange}
                className="h-4 w-4 border-nextjs-gray-2 text-nextjs-blue focus:ring-nextjs-blue-light"
              />
              <span className="ml-2 text-sm">Sistema</span>
            </label>
          </div>
        </SettingsField>
      </SettingsSection>

      <div className="py-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light transition-colors shadow-nextjs-small"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

// Componente para gerenciar contas
const AccountsSettings = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "acc1",
      name: "Conta Corrente",
      type: "CHECKING",
      balance: 3500,
      currency: "BRL",
      isDefault: true,
      userId: "user1",
      includeInTotal: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "acc2",
      name: "Poupança",
      type: "SAVINGS",
      balance: 12000,
      currency: "BRL",
      isDefault: false,
      userId: "user1",
      includeInTotal: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "acc3",
      name: "Cartão de Crédito",
      type: "CREDIT_CARD",
      balance: -450,
      currency: "BRL",
      isDefault: false,
      userId: "user1",
      includeInTotal: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: "",
    type: "CHECKING",
    balance: 0,
    currency: "BRL",
    isDefault: false,
    includeInTotal: true,
  });

  const handleAddAccount = () => {
    const createdAccount: Account = {
      id: `acc-${Date.now()}`,
      name: newAccount.name || "",
      type: (newAccount.type as any) || "CHECKING",
      balance: newAccount.balance || 0,
      currency: newAccount.currency || "BRL",
      isDefault: newAccount.isDefault || false,
      userId: "user1",
      includeInTotal: newAccount.includeInTotal || true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setAccounts([...accounts, createdAccount]);
    setNewAccount({
      name: "",
      type: "CHECKING",
      balance: 0,
      currency: "BRL",
      isDefault: false,
      includeInTotal: true,
    });
    setShowAddForm(false);
  };

  const handleRemoveAccount = (id: string) => {
    if (confirm("Tem certeza de que deseja remover esta conta?")) {
      setAccounts(accounts.filter((account) => account.id !== id));
    }
  };

  const handleChangeAccount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { name, value, type } = e.target;
    const checkedValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setAccounts(
      accounts.map((account) => {
        if (account.id === id) {
          return {
            ...account,
            [name]: type === "checkbox" ? checkedValue : value,
          };
        }
        return account;
      })
    );
  };

  const handleNewAccountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checkedValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setNewAccount({
      ...newAccount,
      [name]: type === "checkbox" ? checkedValue : value,
    });
  };

  const formatCurrency = (value: number, currency: string = "BRL") => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case "CHECKING":
        return "Conta Corrente";
      case "SAVINGS":
        return "Poupança";
      case "CREDIT_CARD":
        return "Cartão de Crédito";
      case "INVESTMENT":
        return "Investimento";
      case "CASH":
        return "Dinheiro";
      default:
        return "Outro";
    }
  };

  return (
    <div>
      <SettingsSection
        title="Contas Bancárias"
        description="Gerencie suas contas bancárias, cartões e outros ativos financeiros"
      >
        <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 overflow-hidden">
          <table className="min-w-full divide-y divide-nextjs-gray-2">
            <thead className="bg-nextjs-gray-1">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
                >
                  Saldo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
                >
                  Padrão
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-nextjs-gray-2">
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      name="name"
                      className="w-full px-2 py-1 border border-nextjs-gray-2 rounded-nextjs"
                      value={account.name}
                      onChange={(e) => handleChangeAccount(e, account.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      name="type"
                      className="w-full px-2 py-1 border border-nextjs-gray-2 rounded-nextjs"
                      value={account.type}
                      onChange={(e) => handleChangeAccount(e, account.id)}
                    >
                      <option value="CHECKING">Conta Corrente</option>
                      <option value="SAVINGS">Poupança</option>
                      <option value="CREDIT_CARD">Cartão de Crédito</option>
                      <option value="INVESTMENT">Investimento</option>
                      <option value="CASH">Dinheiro</option>
                      <option value="OTHER">Outro</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-nextjs-gray-4">
                        R$
                      </span>
                      <input
                        type="number"
                        name="balance"
                        className="w-full pl-8 pr-2 py-1 border border-nextjs-gray-2 rounded-nextjs text-right"
                        value={account.balance}
                        onChange={(e) => handleChangeAccount(e, account.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      className="h-4 w-4 border-nextjs-gray-2 rounded text-nextjs-blue focus:ring-nextjs-blue-light"
                      checked={account.isDefault}
                      onChange={(e) => handleChangeAccount(e, account.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRemoveAccount(account.id)}
                      className="text-expense hover:text-red-700"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddForm ? (
          <div className="mt-4 p-4 bg-nextjs-gray-1 rounded-nextjs">
            <h4 className="text-sm font-medium text-nextjs-black mb-3">
              Adicionar Nova Conta
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-nextjs-gray-4 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs"
                  value={newAccount.name || ""}
                  onChange={handleNewAccountChange}
                  placeholder="Nome da conta"
                />
              </div>
              <div>
                <label className="block text-xs text-nextjs-gray-4 mb-1">
                  Tipo
                </label>
                <select
                  name="type"
                  className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs"
                  value={newAccount.type || "CHECKING"}
                  onChange={handleNewAccountChange}
                >
                  <option value="CHECKING">Conta Corrente</option>
                  <option value="SAVINGS">Poupança</option>
                  <option value="CREDIT_CARD">Cartão de Crédito</option>
                  <option value="INVESTMENT">Investimento</option>
                  <option value="CASH">Dinheiro</option>
                  <option value="OTHER">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-nextjs-gray-4 mb-1">
                  Saldo Inicial
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-nextjs-gray-4">
                    R$
                  </span>
                  <input
                    type="number"
                    name="balance"
                    className="w-full pl-8 pr-3 py-2 border border-nextjs-gray-2 rounded-nextjs"
                    value={newAccount.balance || 0}
                    onChange={handleNewAccountChange}
                    placeholder="0,00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-nextjs-gray-4 mb-1">
                  Moeda
                </label>
                <select
                  name="currency"
                  className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs"
                  value={newAccount.currency || "BRL"}
                  onChange={handleNewAccountChange}
                >
                  <option value="BRL">Real Brasileiro (R$)</option>
                  <option value="USD">Dólar Americano ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">Libra Esterlina (£)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                className="h-4 w-4 border-nextjs-gray-2 rounded text-nextjs-blue focus:ring-nextjs-blue-light"
                checked={newAccount.isDefault || false}
                onChange={handleNewAccountChange}
              />
              <label
                htmlFor="isDefault"
                className="ml-2 text-sm text-nextjs-gray-5"
              >
                Definir como conta padrão
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-sm border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-2"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddAccount}
                className="px-3 py-1.5 text-sm bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light"
              >
                Adicionar Conta
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1 transition-colors"
            >
              + Adicionar Conta
            </button>
          </div>
        )}
      </SettingsSection>
    </div>
  );
};

// Componente para gerenciar categorias
const CategoriesSettings = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cat1",
      name: "Alimentação",
      color: "#FF5733",
      userId: "user1",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat2",
      name: "Moradia",
      color: "#3498DB",
      userId: "user1",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat3",
      name: "Transporte",
      color: "#27AE60",
      userId: "user1",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat4",
      name: "Saúde",
      color: "#E74C3C",
      userId: "user1",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "cat5",
      name: "Entretenimento",
      color: "#9B59B6",
      userId: "user1",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    color: "#0070f3",
    isDefault: false,
  });

  const handleAddCategory = () => {
    const createdCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCategory.name || "",
      color: newCategory.color || "#0070f3",
      userId: "user1",
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCategories([...categories, createdCategory]);
    setNewCategory({
      name: "",
      color: "#0070f3",
      isDefault: false,
    });
    setShowAddForm(false);
  };

  const handleRemoveCategory = (id: string) => {
    if (confirm("Tem certeza de que deseja remover esta categoria?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const handleChangeCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = e.target;

    setCategories(
      categories.map((category) => {
        if (category.id === id) {
          return {
            ...category,
            [name]: value,
          };
        }
        return category;
      })
    );
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  //aqui
  return (
    <div>
      <SettingsSection
        title="Categorias"
        description="Personalize as categorias para suas transações"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-4 border border-nextjs-gray-2 rounded-nextjs hover:shadow-nextjs-small transition-shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <input
                  type="color"
                  name="color"
                  value={category.color}
                  onChange={(e) => handleChangeCategory(e, category.id)}
                  className="h-8 w-8 rounded-full overflow-hidden cursor-pointer border-0"
                  style={{
                    backgroundColor: category.color,
                    appearance: "none",
                  }}
                />
                <button
                  onClick={() => handleRemoveCategory(category.id)}
                  className="text-nextjs-gray-4 hover:text-expense"
                  disabled={category.isDefault}
                  title={
                    category.isDefault
                      ? "Categorias padrão não podem ser removidas"
                      : "Remover categoria"
                  }
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={(e) => handleChangeCategory(e, category.id)}
                className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
                disabled={category.isDefault}
              />
              {category.isDefault && (
                <p className="mt-2 text-xs text-nextjs-gray-4">
                  Categoria padrão
                </p>
              )}
            </div>
          ))}

          {showAddForm ? (
            <div className="p-4 border border-nextjs-gray-2 rounded-nextjs hover:shadow-nextjs-small transition-shadow">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="color"
                  name="color"
                  value={newCategory.color || "#0070f3"}
                  onChange={handleNewCategoryChange}
                  className="h-8 w-8 rounded-full overflow-hidden cursor-pointer border-0"
                  style={{
                    backgroundColor: newCategory.color || "#0070f3",
                    appearance: "none",
                  }}
                />
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-nextjs-gray-4 hover:text-expense"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                name="name"
                value={newCategory.name || ""}
                onChange={handleNewCategoryChange}
                placeholder="Nome da categoria"
                className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleAddCategory}
                  className="px-3 py-1.5 text-sm bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light"
                  disabled={!newCategory.name}
                >
                  Adicionar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="p-4 border border-dashed border-nextjs-gray-3 rounded-nextjs hover:bg-nextjs-gray-1 transition-colors flex flex-col items-center justify-center"
            >
              <span className="text-2xl text-nextjs-gray-4 mb-2">+</span>
              <span className="text-sm text-nextjs-gray-4">Nova Categoria</span>
            </button>
          )}
        </div>
      </SettingsSection>

      <div className="py-4 flex justify-end">
        <button
          onClick={() => alert("Categorias salvas com sucesso!")}
          className="px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light transition-colors shadow-nextjs-small"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

// Componente para configurações de notificações
const NotificationsSettings = () => {
  const [notifications, setNotifications] = useState({
    email: {
      transactionCreated: true,
      monthlyReport: true,
      budgetLimitReached: true,
      accountBalanceLow: false,
    },
    app: {
      transactionCreated: false,
      budgetLimitReached: true,
      accountBalanceLow: true,
      tips: true,
    },
  });

  const handleChange = (
    type: "email" | "app",
    setting: string,
    value: boolean
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: value,
      },
    }));
  };

  return (
    <div>
      <SettingsSection
        title="Notificações por Email"
        description="Escolha quais emails você deseja receber"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Transações criadas
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba um email quando uma nova transação for adicionada
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.email.transactionCreated}
                    onChange={(e) =>
                      handleChange(
                        "email",
                        "transactionCreated",
                        e.target.checked
                      )
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.email.transactionCreated
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.email.transactionCreated
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Relatório mensal
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba um resumo mensal das suas finanças
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.email.monthlyReport}
                    onChange={(e) =>
                      handleChange("email", "monthlyReport", e.target.checked)
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.email.monthlyReport
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.email.monthlyReport
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Limite de orçamento atingido
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba um alerta quando atingir um limite de orçamento
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.email.budgetLimitReached}
                    onChange={(e) =>
                      handleChange(
                        "email",
                        "budgetLimitReached",
                        e.target.checked
                      )
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.email.budgetLimitReached
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.email.budgetLimitReached
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Saldo de conta baixo
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba um alerta quando o saldo de uma conta estiver baixo
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.email.accountBalanceLow}
                    onChange={(e) =>
                      handleChange(
                        "email",
                        "accountBalanceLow",
                        e.target.checked
                      )
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.email.accountBalanceLow
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.email.accountBalanceLow
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Notificações no Aplicativo"
        description="Escolha quais notificações você deseja ver no aplicativo"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Transações criadas
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba uma notificação quando uma nova transação for adicionada
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.app.transactionCreated}
                    onChange={(e) =>
                      handleChange(
                        "app",
                        "transactionCreated",
                        e.target.checked
                      )
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.app.transactionCreated
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.app.transactionCreated
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Limite de orçamento atingido
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba um alerta quando atingir um limite de orçamento
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.app.budgetLimitReached}
                    onChange={(e) =>
                      handleChange(
                        "app",
                        "budgetLimitReached",
                        e.target.checked
                      )
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.app.budgetLimitReached
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.app.budgetLimitReached
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Saldo de conta baixo
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba um alerta quando o saldo de uma conta estiver baixo
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.app.accountBalanceLow}
                    onChange={(e) =>
                      handleChange("app", "accountBalanceLow", e.target.checked)
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.app.accountBalanceLow
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.app.accountBalanceLow
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-nextjs-black">
                Dicas financeiras
              </h4>
              <p className="text-xs text-nextjs-gray-4">
                Receba dicas e sugestões para melhorar suas finanças
              </p>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <span className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.app.tips}
                    onChange={(e) =>
                      handleChange("app", "tips", e.target.checked)
                    }
                  />
                  <div
                    className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                      notifications.app.tips
                        ? "bg-nextjs-blue"
                        : "bg-nextjs-gray-3"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                      notifications.app.tips ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </span>
              </label>
            </div>
          </div>
        </div>
      </SettingsSection>

      <div className="py-4 flex justify-end">
        <button
          onClick={() =>
            alert("Configurações de notificações salvas com sucesso!")
          }
          className="px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light transition-colors shadow-nextjs-small"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

// Componente para configurações de segurança
const SecuritySettings = () => {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setTwoFactorEnabled(checked);
    } else {
      setPassword((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChangePassword = () => {
    // Validações
    if (!password.current) {
      alert("Por favor, insira sua senha atual.");
      return;
    }

    if (password.new.length < 8) {
      alert("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password.new !== password.confirm) {
      alert("As senhas não coincidem.");
      return;
    }

    // Enviar para a API
    alert("Senha alterada com sucesso!");

    // Limpar formulário
    setPassword({
      current: "",
      new: "",
      confirm: "",
    });
  };

  return (
    <div>
      <SettingsSection
        title="Alterar Senha"
        description="Atualize sua senha para manter sua conta segura"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-nextjs-gray-4 mb-1">
              Senha Atual
            </label>
            <input
              type="password"
              name="current"
              className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
              value={password.current}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-nextjs-gray-4 mb-1">
              Nova Senha
            </label>
            <input
              type="password"
              name="new"
              className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
              value={password.new}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs text-nextjs-gray-4">
              A senha deve ter pelo menos 8 caracteres
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-nextjs-gray-4 mb-1">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              name="confirm"
              className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
              value={password.confirm}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light transition-colors"
            >
              Alterar Senha
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Autenticação de Dois Fatores"
        description="Adicione uma camada extra de segurança à sua conta"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-nextjs-black">
              Ativar autenticação de dois fatores
            </h4>
            <p className="text-xs text-nextjs-gray-4">
              Proteja sua conta solicitando um código adicional ao fazer login
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <span className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={twoFactorEnabled}
                  onChange={handleChange}
                />
                <div
                  className={`w-10 h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-nextjs-blue-light ${
                    twoFactorEnabled ? "bg-nextjs-blue" : "bg-nextjs-gray-3"
                  }`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                    twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </span>
            </label>
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-nextjs-blue-lighter rounded-nextjs border border-nextjs-blue-light">
            <p className="text-sm text-nextjs-gray-5">
              A autenticação de dois fatores está ativada. Lembre-se de manter
              seu aplicativo de autenticação ou número de telefone atualizados.
            </p>
          </div>
        )}
      </SettingsSection>

      <SettingsSection
        title="Sessões Ativas"
        description="Gerencie os dispositivos que estão conectados à sua conta"
      >
        <div className="space-y-4">
          <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-nextjs-black">
                  Este dispositivo
                </h4>
                <p className="text-xs text-nextjs-gray-4">
                  Windows • Chrome • São Paulo, Brasil
                </p>
                <p className="text-xs text-nextjs-gray-4">
                  Último acesso: Agora
                </p>
              </div>
              <div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Ativo
                </span>
              </div>
            </div>
          </div>

          <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-nextjs-black">
                  iPhone 13
                </h4>
                <p className="text-xs text-nextjs-gray-4">
                  iOS • Safari • São Paulo, Brasil
                </p>
                <p className="text-xs text-nextjs-gray-4">
                  Último acesso: 2 horas atrás
                </p>
              </div>
              <div>
                <button className="text-expense hover:text-red-700 text-sm">
                  Encerrar Sessão
                </button>
              </div>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};

// Componente principal da página de configurações
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs: SettingsTab[] = [
    { id: "profile", label: "Perfil" },
    { id: "accounts", label: "Contas" },
    { id: "categories", label: "Categorias" },
    { id: "notifications", label: "Notificações" },
    { id: "security", label: "Segurança" },
  ];

  // Renderizar o conteúdo ativo com base na aba selecionada
  const renderActiveContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "accounts":
        return <AccountsSettings />;
      case "categories":
        return <CategoriesSettings />;
      case "notifications":
        return <NotificationsSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cabeçalho da página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nextjs-black mb-2">
          Configurações
        </h1>
        <p className="text-nextjs-gray-4">
          Gerencie suas preferências e personalize a aplicação
        </p>
      </div>

      {/* Abas de configuração */}
      <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small overflow-hidden">
        <SettingsTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="p-6">{renderActiveContent()}</div>
      </div>
    </div>
  );
}
