// src/types/budget.ts

/**
 * Enum que define os períodos possíveis para orçamentos
 */
export enum BudgetPeriod {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

/**
 * Interface que define a estrutura de um orçamento
 */
export interface Budget {
  /**
   * Identificador único do orçamento
   */
  id: string;

  /**
   * Nome do orçamento
   */
  name: string;

  /**
   * Valor limite do orçamento
   */
  amount: number;

  /**
   * Valor já gasto dentro deste orçamento
   */
  spent: number;

  /**
   * Período do orçamento
   */
  period: BudgetPeriod;

  /**
   * Data de início do orçamento
   */
  startDate: Date;

  /**
   * Data de término do orçamento (opcional)
   */
  endDate?: Date;

  /**
   * Identificador da categoria associada (opcional)
   * Se não especificado, o orçamento se aplica a todas as categorias
   */
  categoryId?: string;

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

/**
 * Interface para estrutura de dados de categoria de orçamento
 * Útil para componentes de visualização
 */
export interface BudgetCategory {
  /**
   * Identificador único da categoria
   */
  id: string;

  /**
   * Nome da categoria
   */
  name: string;

  /**
   * Valor orçado para a categoria
   */
  budgeted: number;

  /**
   * Valor já gasto na categoria
   */
  spent: number;

  /**
   * Cor da categoria para visualização em gráficos
   */
  color: string;
}

/**
 * Interface para metas financeiras
 */
export interface FinancialGoal {
  /**
   * Identificador único da meta
   */
  id: string;

  /**
   * Nome da meta
   */
  name: string;

  /**
   * Valor alvo da meta
   */
  targetAmount: number;

  /**
   * Valor atual já economizado
   */
  currentAmount: number;

  /**
   * Data alvo para atingir a meta (opcional)
   */
  targetDate?: Date;

  /**
   * Cor personalizada para identificação visual (opcional)
   */
  color?: string;

  /**
   * Ícone personalizado (opcional)
   */
  icon?: string;

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
