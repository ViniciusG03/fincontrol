// src/components/ExpenseChart.tsx
"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import { formatCurrency, formatPercentage } from "../lib/format";

// Definição de tipos
interface CategoryExpense {
  id: string;
  name: string;
  value: number;
  color: string;
}

interface ExpenseChartProps {
  data: CategoryExpense[];
  title?: string;
  height?: number | string;
}

// Tipo para o tooltip
type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    payload: CategoryExpense;
    value: number;
  }>;
};

// Componente personalizado para o tooltip
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-nextjs-white p-3 border border-nextjs-gray-2 rounded-nextjs shadow-nextjs-small">
        <p className="font-medium">{data.name}</p>
        <p className="text-nextjs-gray-4 text-sm">
          {formatCurrency(data.value)}
        </p>
      </div>
    );
  }

  return null;
};

export default function ExpenseChart({
  data,
  title = "Despesas por Categoria",
  height = 300,
}: ExpenseChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Calcular total de despesas
  const totalExpenses = data.reduce((sum, category) => sum + category.value, 0);

  // Funções para interatividade
  const handleMouseEnter = (_: React.MouseEvent, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small overflow-hidden">
      <div className="p-6 border-b border-nextjs-gray-2">
        <h2 className="text-lg font-semibold text-nextjs-black">{title}</h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Gráfico */}
          <div className="w-full md:w-1/2" style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={entry.color}
                      strokeWidth={activeIndex === index ? 2 : 0}
                      style={{
                        filter:
                          activeIndex === index
                            ? "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))"
                            : "none",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda detalhada */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6">
            <h3 className="text-sm font-medium text-nextjs-gray-4 mb-3">
              Detalhamento
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {data.map((category, index) => {
                const percentage = category.value / totalExpenses;
                return (
                  <div
                    key={category.id}
                    className={`flex justify-between items-center p-2 rounded-nextjs transition-colors ${
                      activeIndex === index ? "bg-nextjs-gray-1" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatCurrency(category.value)}
                      </div>
                      <div className="text-xs text-nextjs-gray-4">
                        {formatPercentage(percentage)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-nextjs-gray-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-bold">
                  {formatCurrency(totalExpenses)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
