// src/app/(app)/transactions/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
"use client";

import React, { useState, useEffect } from "react";
import { Transaction, Account, Category } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";
import TransactionForm from "@/components/TransactionForm";

// Componente para filtros
const TransactionFilters: React.FC<{
  accounts: Account[];
  categories: Category[];
  onFilterChange: (filters: any) => void;
}> = ({ accounts, categories, onFilterChange }) => {
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>(
    {}
  );
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState<{
    min?: number;
    max?: number;
  }>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Atualizar filtros quando qualquer valor mudar
  useEffect(() => {
    onFilterChange({
      dateRange,
      accounts: selectedAccounts,
      categories: selectedCategories,
      amountRange,
      searchTerm,
    });
  }, [
    dateRange,
    selectedAccounts,
    selectedCategories,
    amountRange,
    searchTerm,
    onFilterChange,
  ]);

  return (
    <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-nextjs-gray-4 mb-1">
            Buscar
          </label>
          <input
            type="text"
            placeholder="Buscar transações..."
            className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-nextjs-gray-4 mb-1">
            Período
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-nextjs-gray-2 rounded-nextjs"
              value={dateRange.start || ""}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
            <span className="flex items-center text-nextjs-gray-4">até</span>
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-nextjs-gray-2 rounded-nextjs"
              value={dateRange.end || ""}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <button className="h-full mt-7 px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light">
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Filtros avançados podem ser expandidos aqui */}
    </div>
  );
};

// Componente para a lista de transações
const TransactionList: React.FC<{
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}> = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-nextjs-gray-2">
          <thead className="bg-nextjs-gray-1">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
              >
                Data
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
              >
                Descrição
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
              >
                Categoria
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
              >
                Conta
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-nextjs-gray-4 uppercase tracking-wider"
              >
                Valor
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
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-nextjs-gray-1">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nextjs-gray-5">
                    {formatDate(transaction.date, { format: "short" })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nextjs-black">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nextjs-gray-5">
                    {/* Aqui você mostraria o nome da categoria */}
                    Categoria
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nextjs-gray-5">
                    {/* Aqui você mostraria o nome da conta */}
                    Conta
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                      transaction.amount >= 0 ? "text-income" : "text-expense"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-nextjs-blue hover:text-nextjs-blue-light mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(transaction)}
                      className="text-expense hover:text-red-700"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-nextjs-gray-4"
                >
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Página principal de transações
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simular chamadas de API para dados
        // Em um caso real, você faria chamadas separadas para cada tipo de dados

        // Dados fictícios para demonstração
        const mockTransactions: Transaction[] = [
          {
            id: "1",
            description: "Supermercado",
            amount: -450,
            date: new Date("2025-03-05"),
            categoryId: "cat1",
            accountId: "acc1",
            userId: "user1",
            isRecurring: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            description: "Salário",
            amount: 5000,
            date: new Date("2025-03-01"),
            categoryId: "cat2",
            accountId: "acc1",
            userId: "user1",
            isRecurring: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          // Mais transações...
        ];

        const mockAccounts: Account[] = [
          {
            id: "acc1",
            name: "Conta Corrente",
            type: "CHECKING" as const,
            balance: 3500,
            currency: "BRL",
            isDefault: true,
            userId: "user1",
            includeInTotal: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          // Mais contas...
        ];

        const mockCategories: Category[] = [
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
            name: "Renda",
            color: "#33FF57",
            userId: "user1",
            isDefault: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          // Mais categorias...
        ];

        // Simular tempo de carregamento
        setTimeout(() => {
          setTransactions(mockTransactions);
          setFilteredTransactions(mockTransactions);
          setAccounts(mockAccounts);
          setCategories(mockCategories);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Aplicar filtros
  const handleFilterChange = (filters: any) => {
    let filtered = [...transactions];

    // Aplicar filtros aqui
    // Este é um exemplo simples, você pode expandir conforme necessário
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start);
      filtered = filtered.filter((t) => new Date(t.date) >= startDate);
    }

    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter((t) => new Date(t.date) <= endDate);
    }

    setFilteredTransactions(filtered);
  };

  // Adicionar nova transação
  const handleAddTransaction = async (data: any) => {
    // Em um caso real, você faria uma chamada à API aqui
    const newTransaction: Transaction = {
      id: `temp-${Date.now()}`, // Em produção, o ID viria do backend
      ...data,
      userId: "user1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Adicionar à lista
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
    setShowForm(false);
  };

  // Editar transação existente
  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  // Atualizar transação
  const handleUpdateTransaction = async (data: any) => {
    if (!editingTransaction) return;

    // Em um caso real, você faria uma chamada à API aqui
    const updatedTransaction: Transaction = {
      ...editingTransaction,
      ...data,
      updatedAt: new Date(),
    };

    // Atualizar na lista
    const updatedTransactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );

    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
    setEditingTransaction(null);
    setShowForm(false);
  };

  // Excluir transação
  const handleDeleteTransaction = async (transaction: Transaction) => {
    if (!confirm("Tem certeza de que deseja excluir esta transação?")) return;

    // Em um caso real, você faria uma chamada à API aqui

    // Remover da lista
    const updatedTransactions = transactions.filter(
      (t) => t.id !== transaction.id
    );
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
  };

  // Fechar o formulário
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cabeçalho da página */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-nextjs-black mb-2">
            Transações
          </h1>
          <p className="text-nextjs-gray-4">
            Visualize, adicione e gerencie suas transações financeiras.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTransaction(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light transition-colors shadow-nextjs-small"
        >
          Nova Transação
        </button>
      </div>

      {/* Filtros */}
      <TransactionFilters
        accounts={accounts}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {/* Lista de transações ou carregando */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-nextjs-blue-lighter rounded-full mb-4"></div>
            <div className="text-nextjs-gray-3">Carregando transações...</div>
          </div>
        </div>
      ) : (
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      )}

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl">
            <TransactionForm
              initialData={editingTransaction || undefined}
              accounts={accounts}
              categories={categories}
              onSubmit={
                editingTransaction
                  ? handleUpdateTransaction
                  : handleAddTransaction
              }
              onCancel={handleCloseForm}
              mode={editingTransaction ? "edit" : "create"}
            />
          </div>
        </div>
      )}

      {/* Paginação */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-nextjs-gray-4">
          Mostrando{" "}
          <span className="font-medium">{filteredTransactions.length}</span>{" "}
          transações
        </div>

        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1 text-sm">
            Anterior
          </button>
          <button className="px-3 py-1 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1 text-sm">
            2
          </button>
          <button className="px-3 py-1 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1 text-sm">
            3
          </button>
          <button className="px-3 py-1 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1 text-sm">
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
