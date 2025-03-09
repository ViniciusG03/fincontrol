// src/app/(app)/reports/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency, formatDate, formatPercentage } from "@/lib/format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Sector,
} from "recharts";

// Tipos para os relatórios
interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

interface CategorySummary {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface Report {
  id: string;
  name: string;
  description: string;
  component: React.ReactNode;
}

// Componente de seletor de período
const PeriodSelector = ({
  period,
  onChange,
}: {
  period: string;
  onChange: (period: string) => void;
}) => {
  return (
    <div className="inline-flex bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small">
      <select
        className="appearance-none bg-transparent py-2 pl-4 pr-8 focus:outline-none text-sm"
        value={period}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="last30days">Últimos 30 dias</option>
        <option value="last90days">Últimos 90 dias</option>
        <option value="thisMonth">Este mês</option>
        <option value="lastMonth">Mês passado</option>
        <option value="thisYear">Este ano</option>
        <option value="custom">Período personalizado</option>
      </select>
    </div>
  );
};

// Componente de cartão para relatório
const ReportCard = ({
  title,
  children,
  fullWidth = false,
}: {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <div
      className={`bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small ${
        fullWidth ? "col-span-1 md:col-span-2" : ""
      }`}
    >
      <div className="p-6 border-b border-nextjs-gray-2">
        <h2 className="text-lg font-semibold text-nextjs-black">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

// Componente para tooltip personalizado dos gráficos
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-nextjs-white p-3 border border-nextjs-gray-2 rounded-nextjs shadow-nextjs-small">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Componente para o gráfico de pizza com interatividade
const PieChartWithActiveSegment = ({
  data,
  dataKey = "amount",
  nameKey = "name",
  colors,
}: {
  data: any[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // Componente para render do setor ativo
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="#fff"
          strokeWidth={2}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          className="text-xs"
        >
          {`${payload[nameKey]} (${(percent * 100).toFixed(1)}%)`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={14}
          textAnchor={textAnchor}
          fill="#999"
          className="text-xs"
        >
          {`${formatCurrency(value)}`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex !== null ? activeIndex : undefined}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey={dataKey}
          nameKey={nameKey}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                colors
                  ? colors[index % colors.length]
                  : entry.color ||
                    `#${((Math.random() * 0xffffff) << 0)
                      .toString(16)
                      .padStart(6, "0")}`
              }
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Componente principal da página de relatórios
export default function ReportsPage() {
  const [period, setPeriod] = useState("thisMonth");
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<MonthlySummary[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<
    CategorySummary[]
  >([]);
  const [incomeByCategory, setIncomeByCategory] = useState<CategorySummary[]>(
    []
  );

  // Carregar dados dos relatórios
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        // Simular chamada à API para dados de relatórios

        // Dados fictícios para o gráfico de fluxo de caixa mensal
        const mockMonthlyData: MonthlySummary[] = [
          { month: "Jan", income: 5000, expenses: 3800, balance: 1200 },
          { month: "Fev", income: 5200, expenses: 4100, balance: 1100 },
          { month: "Mar", income: 4800, expenses: 3500, balance: 1300 },
          { month: "Abr", income: 5100, expenses: 4300, balance: 800 },
          { month: "Mai", income: 5500, expenses: 4000, balance: 1500 },
          { month: "Jun", income: 5300, expenses: 4200, balance: 1100 },
        ];

        // Dados fictícios para o gráfico de despesas por categoria
        const mockExpensesByCategory: CategorySummary[] = [
          {
            id: "cat1",
            name: "Moradia",
            amount: 1200,
            percentage: 28,
            color: "#0070f3",
          },
          {
            id: "cat2",
            name: "Alimentação",
            amount: 850,
            percentage: 20,
            color: "#ff0080",
          },
          {
            id: "cat3",
            name: "Transporte",
            amount: 400,
            percentage: 10,
            color: "#0ccbff",
          },
          {
            id: "cat4",
            name: "Entretenimento",
            amount: 300,
            percentage: 7,
            color: "#7928ca",
          },
          {
            id: "cat5",
            name: "Saúde",
            amount: 250,
            percentage: 6,
            color: "#50e3c2",
          },
          {
            id: "cat6",
            name: "Outros",
            amount: 1200,
            percentage: 29,
            color: "#8a919c",
          },
        ];

        // Dados fictícios para o gráfico de receitas por categoria
        const mockIncomeByCategory: CategorySummary[] = [
          {
            id: "inc1",
            name: "Salário",
            amount: 4200,
            percentage: 80,
            color: "#00a86b",
          },
          {
            id: "inc2",
            name: "Freelance",
            amount: 800,
            percentage: 15,
            color: "#2ed573",
          },
          {
            id: "inc3",
            name: "Investimentos",
            amount: 250,
            percentage: 5,
            color: "#7bed9f",
          },
        ];

        // Simular tempo de carregamento
        setTimeout(() => {
          setMonthlyData(mockMonthlyData);
          setExpensesByCategory(mockExpensesByCategory);
          setIncomeByCategory(mockIncomeByCategory);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erro ao carregar dados de relatórios:", error);
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [period]);

  // Calcular totais
  const totalIncome = incomeByCategory.reduce(
    (sum, cat) => sum + cat.amount,
    0
  );
  const totalExpenses = expensesByCategory.reduce(
    (sum, cat) => sum + cat.amount,
    0
  );
  const balance = totalIncome - totalExpenses;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cabeçalho da página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nextjs-black mb-2">
          Relatórios
        </h1>
        <p className="text-nextjs-gray-4">
          Análises e visualizações para entender melhor suas finanças.
        </p>
      </div>

      {/* Controles do relatório */}
      <div className="flex justify-between items-center mb-8">
        <PeriodSelector period={period} onChange={setPeriod} />

        <div className="flex space-x-4">
          <button className="px-4 py-2 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1 transition-colors">
            Exportar CSV
          </button>
          <button className="px-4 py-2 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-1 transition-colors">
            Imprimir
          </button>
        </div>
      </div>

      {/* Relatórios */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-nextjs-blue-lighter rounded-full mb-4"></div>
            <div className="text-nextjs-gray-3">Carregando relatórios...</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resumo do período */}
          <ReportCard title="Resumo do Período">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-nextjs-gray-1 rounded-nextjs">
                <p className="text-sm text-nextjs-gray-4 mb-1">Receitas</p>
                <p className="text-xl font-bold text-income">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
              <div className="text-center p-4 bg-nextjs-gray-1 rounded-nextjs">
                <p className="text-sm text-nextjs-gray-4 mb-1">Despesas</p>
                <p className="text-xl font-bold text-expense">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
              <div className="text-center p-4 bg-nextjs-gray-1 rounded-nextjs">
                <p className="text-sm text-nextjs-gray-4 mb-1">Balanço</p>
                <p className="text-xl font-bold text-nextjs-blue">
                  {formatCurrency(balance)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-nextjs-gray-4 mb-2">
                Comparativo
              </h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-income bg-green-200">
                      Receitas
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-income">
                      {formatCurrency(totalIncome)}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-nextjs-gray-2">
                  <div
                    style={{ width: "100%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-income"
                  ></div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-expense bg-red-200">
                      Despesas
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-expense">
                      {formatCurrency(totalExpenses)}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-nextjs-gray-2">
                  <div
                    style={{ width: `${(totalExpenses / totalIncome) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-expense"
                  ></div>
                </div>
                <div className="text-xs text-nextjs-gray-4 text-right">
                  Taxa de economia:{" "}
                  <span className="font-medium">
                    {formatPercentage(balance / totalIncome)}
                  </span>
                </div>
              </div>
            </div>
          </ReportCard>

          {/* Despesas por Categoria */}
          <ReportCard title="Despesas por Categoria">
            <div className="h-64">
              <PieChartWithActiveSegment data={expensesByCategory} />
            </div>

            <div className="mt-4 space-y-2">
              {expensesByCategory.slice(0, 3).map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}

              {expensesByCategory.length > 3 && (
                <div className="pt-2">
                  <a
                    href="/reports/expenses"
                    className="text-nextjs-blue hover:text-nextjs-blue-light text-sm"
                  >
                    Ver todas as categorias →
                  </a>
                </div>
              )}
            </div>
          </ReportCard>

          {/* Receitas por Categoria */}
          <ReportCard title="Receitas por Categoria">
            <div className="h-64">
              <PieChartWithActiveSegment data={incomeByCategory} />
            </div>

            <div className="mt-4 space-y-2">
              {incomeByCategory.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>
          </ReportCard>

          {/* Fluxo de Caixa Mensal */}
          <ReportCard title="Fluxo de Caixa Mensal" fullWidth>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `R$${value}`}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="Receitas"
                    stroke="#00a86b"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7, strokeWidth: 1, stroke: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name="Despesas"
                    stroke="#e63946"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7, strokeWidth: 1, stroke: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    name="Saldo"
                    stroke="#0070f3"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7, strokeWidth: 1, stroke: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-nextjs-gray-4">
                  Média Mensal de Receitas
                </p>
                <p className="text-lg font-medium text-income">
                  {formatCurrency(
                    monthlyData.reduce((sum, month) => sum + month.income, 0) /
                      monthlyData.length
                  )}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-nextjs-gray-4">
                  Média Mensal de Despesas
                </p>
                <p className="text-lg font-medium text-expense">
                  {formatCurrency(
                    monthlyData.reduce(
                      (sum, month) => sum + month.expenses,
                      0
                    ) / monthlyData.length
                  )}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-nextjs-gray-4">Média de Economia</p>
                <p className="text-lg font-medium text-nextjs-blue">
                  {formatCurrency(
                    monthlyData.reduce((sum, month) => sum + month.balance, 0) /
                      monthlyData.length
                  )}
                </p>
              </div>
            </div>
          </ReportCard>

          {/* Tendências de Gastos */}
          <ReportCard title="Tendências de Gastos" fullWidth>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `R$${value}`}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Legend />
                  <Bar dataKey="expenses" name="Despesas" fill="#e63946" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium text-nextjs-gray-4 mb-2">
                  Mês com maior gasto
                </h4>
                {(() => {
                  const maxExpenseMonth = [...monthlyData].sort(
                    (a, b) => b.expenses - a.expenses
                  )[0];
                  return (
                    <div className="bg-nextjs-gray-1 p-3 rounded-nextjs">
                      <p className="text-lg font-medium">
                        {maxExpenseMonth.month}
                      </p>
                      <p className="text-expense">
                        {formatCurrency(maxExpenseMonth.expenses)}
                      </p>
                    </div>
                  );
                })()}
              </div>
              <div>
                <h4 className="text-sm font-medium text-nextjs-gray-4 mb-2">
                  Mês com menor gasto
                </h4>
                {(() => {
                  const minExpenseMonth = [...monthlyData].sort(
                    (a, b) => a.expenses - b.expenses
                  )[0];
                  return (
                    <div className="bg-nextjs-gray-1 p-3 rounded-nextjs">
                      <p className="text-lg font-medium">
                        {minExpenseMonth.month}
                      </p>
                      <p className="text-income">
                        {formatCurrency(minExpenseMonth.expenses)}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </ReportCard>
        </div>
      )}
    </div>
  );
}
