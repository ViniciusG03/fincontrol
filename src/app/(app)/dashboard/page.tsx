// src/app/(app)/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import { formatCurrency } from "@/lib/format";

// Componente de cartão de resumo
interface SummaryCardProps {
  title: string;
  value: number;
  type: "neutral" | "income" | "expense";
  icon?: React.ReactNode;
}

const SummaryCard = ({ title, value, type, icon }: SummaryCardProps) => {
  const getColorClass = () => {
    switch (type) {
      case "income":
        return "text-income";
      case "expense":
        return "text-expense";
      default:
        return "text-nextjs-black";
    }
  };

  return (
    <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-sm font-medium text-nextjs-gray-4">{title}</h2>
        {icon}
      </div>
      <div className="text-2xl font-bold text-nextjs-black mb-2">
        {formatCurrency(value)}
      </div>
      <div className={`text-sm ${getColorClass()}`}>
        {type === "income" ? "Entradas" : type === "expense" ? "Saídas" : ""}
      </div>
    </div>
  );
};

// Componente de lista de transações recentes
interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

const TransactionList = ({ transactions, limit = 5 }: TransactionListProps) => {
  const limitedTransactions = transactions.slice(0, limit);

  return (
    <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small">
      <div className="p-6 border-b border-nextjs-gray-2">
        <h2 className="text-lg font-semibold text-nextjs-black">
          Últimas Transações
        </h2>
      </div>
      {limitedTransactions.length > 0 ? (
        <div className="divide-y divide-nextjs-gray-2">
          {limitedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-nextjs-gray-1 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-nextjs-gray-4">
                    {new Date(transaction.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div
                  className={`font-medium ${
                    transaction.amount >= 0 ? "text-income" : "text-expense"
                  }`}
                >
                  {transaction.amount >= 0 ? "+" : ""}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-nextjs-gray-4">
          Nenhuma transação encontrada para este período.
        </div>
      )}
      <div className="p-4 border-t border-nextjs-gray-2">
        <a
          href="/transactions"
          className="text-nextjs-blue hover:text-nextjs-blue-light text-sm font-medium transition-colors"
        >
          Ver todas as transações →
        </a>
      </div>
    </div>
  );
};

// Componente principal da página Dashboard
export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulando uma chamada à API
    async function fetchTransactions() {
      setLoading(true);
      try {
        // Em um caso real, aqui você faria uma chamada à sua API
        // const response = await fetch('/api/transactions?month=...');

        // Dados fictícios para demonstração
        const mockData: Transaction[] = [
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
          {
            id: "3",
            description: "Aluguel",
            amount: -1200,
            date: new Date("2025-03-02"),
            categoryId: "cat3",
            accountId: "acc1",
            userId: "user1",
            isRecurring: true,
            recurringId: "rec1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "4",
            description: "Netflix",
            amount: -39.9,
            date: new Date("2025-03-15"),
            categoryId: "cat4",
            accountId: "acc1",
            userId: "user1",
            isRecurring: true,
            recurringId: "rec2",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "5",
            description: "Internet",
            amount: -120,
            date: new Date("2025-03-10"),
            categoryId: "cat5",
            accountId: "acc1",
            userId: "user1",
            isRecurring: true,
            recurringId: "rec3",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        // Simulando o tempo de carregamento da API
        setTimeout(() => {
          setTransactions(mockData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [selectedMonth]);

  // Calcular saldo do mês
  const balance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // Calcular receitas
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular despesas
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Array de meses para o seletor
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cabeçalho da página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nextjs-black mb-2">Dashboard</h1>
        <p className="text-nextjs-gray-4">
          Visualize e gerencie suas finanças de forma simples e eficiente.
        </p>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        {/* Seletor de mês */}
        <div className="inline-flex bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small">
          <select
            className="appearance-none bg-transparent py-2 pl-4 pr-8 focus:outline-none text-sm"
            value={selectedMonth.getMonth()}
            onChange={(e) => {
              const newDate = new Date(selectedMonth);
              newDate.setMonth(parseInt(e.target.value));
              setSelectedMonth(newDate);
            }}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Botão adicionar transação */}
        <button className="inline-flex items-center px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light transition-colors shadow-nextjs-small">
          <span className="mr-2">+</span>
          <span>Nova Transação</span>
        </button>
      </div>

      {loading ? (
        // Estado de carregamento
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-nextjs-blue-lighter rounded-full mb-4"></div>
            <div className="text-nextjs-gray-3">Carregando dados...</div>
          </div>
        </div>
      ) : (
        <>
          {/* Cards com resumo financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Saldo */}
            <SummaryCard
              title="Saldo do Mês"
              value={balance}
              type={balance >= 0 ? "income" : "expense"}
            />

            {/* Receitas */}
            <SummaryCard
              title="Receitas"
              value={income}
              type="income"
              icon={<span className="text-income">↑</span>}
            />

            {/* Despesas */}
            <SummaryCard
              title="Despesas"
              value={expenses}
              type="expense"
              icon={<span className="text-expense">↓</span>}
            />
          </div>

          {/* Últimas transações */}
          <TransactionList transactions={transactions} />

          {/* Card de dicas */}
          <div className="mt-8 bg-nextjs-blue-lighter rounded-nextjs p-6 border border-nextjs-blue-light">
            <h3 className="font-semibold text-nextjs-blue mb-2">
              Dica financeira
            </h3>
            <p className="text-nextjs-gray-5 mb-4">
              Tente reservar pelo menos 20% da sua renda mensal para economias e
              investimentos. Isso ajudará a construir um patrimônio sólido ao
              longo do tempo.
            </p>
            <a
              href="/tips"
              className="text-nextjs-blue hover:text-nextjs-blue-light text-sm font-medium transition-colors"
            >
              Mais dicas financeiras →
            </a>
          </div>
        </>
      )}
    </div>
  );
}
