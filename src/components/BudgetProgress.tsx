// src/components/BudgetProgress.tsx
"use client";

import React from "react";
import { formatCurrency, formatPercentage } from "../lib/format";

// Definição de tipos
interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

interface BudgetProgressProps {
  categories: BudgetCategory[];
  title?: string;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({
  categories,
  title = "Orçamento Mensal",
}) => {
  // Ordenar categorias por percentual gasto (do maior para o menor)
  const sortedCategories = [...categories].sort((a, b) => {
    const percentA = a.spent / a.budgeted;
    const percentB = b.spent / b.budgeted;
    return percentB - percentA;
  });

  // Calcular totais
  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalPercentage = totalBudgeted > 0 ? totalSpent / totalBudgeted : 0;

  return (
    <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small">
      <div className="p-6 border-b border-nextjs-gray-2">
        <h2 className="text-lg font-semibold text-nextjs-black">{title}</h2>
      </div>

      <div className="p-6">
        {/* Progresso total */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-nextjs-gray-4">
              Progresso Geral
            </h3>
            <span className="text-sm font-medium">
              {formatPercentage(totalPercentage)}
            </span>
          </div>
          <div className="w-full bg-nextjs-gray-2 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                totalPercentage > 1 ? "bg-expense" : "bg-nextjs-blue"
              }`}
              style={{ width: `${Math.min(totalPercentage * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-nextjs-gray-4 mt-1">
            <span>{formatCurrency(totalSpent)}</span>
            <span>de {formatCurrency(totalBudgeted)}</span>
          </div>
        </div>

        {/* Progresso por categoria */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-nextjs-gray-4">
            Por Categoria
          </h3>

          {sortedCategories.map((category) => {
            const percentage =
              category.budgeted > 0 ? category.spent / category.budgeted : 0;
            const isOverBudget = percentage > 1;

            return (
              <div key={category.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isOverBudget ? "text-expense" : "text-nextjs-gray-4"
                    }`}
                  >
                    {formatPercentage(percentage)}
                  </span>
                </div>

                <div className="w-full bg-nextjs-gray-2 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      isOverBudget ? "bg-expense" : "bg-nextjs-blue"
                    }`}
                    style={{
                      width: `${Math.min(percentage * 100, 100)}%`,
                      backgroundColor: isOverBudget
                        ? undefined
                        : category.color,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-nextjs-gray-4">
                  <span>{formatCurrency(category.spent)}</span>
                  <span>de {formatCurrency(category.budgeted)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-nextjs-gray-2 bg-nextjs-gray-1">
        <a
          href="/budgets"
          className="text-nextjs-blue hover:text-nextjs-blue-light text-sm font-medium transition-colors"
        >
          Gerenciar orçamentos →
        </a>
      </div>
    </div>
  );
};

export default BudgetProgress;
