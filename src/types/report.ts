// src/types/report.ts

/**
 * Interface para resumo mensal de fluxo de caixa
 * Utilizada em gráficos e relatórios financeiros
 */
export interface MonthlySummary {
  /**
   * Nome ou código do mês (ex: "Jan", "Fev", etc.)
   */
  month: string;

  /**
   * Total de receitas no mês
   */
  income: number;

  /**
   * Total de despesas no mês
   */
  expenses: number;

  /**
   * Saldo do mês (income - expenses)
   */
  balance: number;
}

/**
 * Interface para filtros de relatórios
 */
export interface ReportFilter {
  /**
   * Período do relatório
   */
  period:
    | "last30days"
    | "last90days"
    | "thisMonth"
    | "lastMonth"
    | "thisYear"
    | "custom";

  /**
   * Data de início para período personalizado
   */
  startDate?: Date;

  /**
   * Data de término para período personalizado
   */
  endDate?: Date;

  /**
   * Lista de IDs de categorias para filtrar
   */
  categories?: string[];

  /**
   * Lista de IDs de contas para filtrar
   */
  accounts?: string[];

  /**
   * Tipo de transação para filtrar
   */
  transactionType?: "income" | "expense" | "all";
}

/**
 * Interface para representação de relatório
 */
export interface Report {
  /**
   * Identificador único do relatório
   */
  id: string;

  /**
   * Nome do relatório
   */
  name: string;

  /**
   * Descrição do relatório
   */
  description: string;

  /**
   * Tipo de relatório
   */
  type: "cashflow" | "expenses" | "income" | "budget" | "custom";

  /**
   * Filtros aplicados ao relatório
   */
  filters: ReportFilter;

  /**
   * Indica se o relatório é favorito
   */
  isFavorite: boolean;

  /**
   * Identificador do usuário proprietário
   */
  userId: string;

  /**
   * Data e hora de criação do registro
   */
  createdAt: Date;

  /**
   * Data e hora da última atualização do registro
   */
  updatedAt: Date;
}
