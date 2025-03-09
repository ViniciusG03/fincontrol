// src/types/transaction.ts

/**
 * Interface que define a estrutura de uma transação financeira
 */
export interface Transaction {
  /**
   * Identificador único da transação
   */
  id: string;

  /**
   * Descrição da transação
   */
  description: string;

  /**
   * Valor da transação
   * - Valores positivos representam receitas
   * - Valores negativos representam despesas
   */
  amount: number;

  /**
   * Data da transação
   */
  date: Date;

  /**
   * Identificador da categoria da transação
   */
  categoryId: string;

  /**
   * Identificador da conta associada à transação
   */
  accountId: string;

  /**
   * Identificador do usuário proprietário da transação
   */
  userId: string;

  /**
   * Notas adicionais sobre a transação (opcional)
   */
  notes?: string;

  /**
   * Indica se esta é uma transação recorrente
   */
  isRecurring: boolean;

  /**
   * Identificador da recorrência quando é uma transação recorrente (opcional)
   */
  recurringId?: string;

  /**
   * Array de URLs ou identificadores de anexos (opcional)
   */
  attachments?: string[];

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
 * Enum que define os intervalos de recorrência possíveis
 */
export enum RecurrenceFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
}

/**
 * Interface para transações recorrentes
 */
export interface Recurring {
  /**
   * Identificador único da recorrência
   */
  id: string;

  /**
   * Descrição da transação recorrente
   */
  description: string;

  /**
   * Valor da transação recorrente
   */
  amount: number;

  /**
   * Frequência da recorrência
   */
  frequency: RecurrenceFrequency;

  /**
   * Data de início da recorrência
   */
  startDate: Date;

  /**
   * Data de término da recorrência (opcional)
   */
  endDate?: Date;

  /**
   * Identificador da categoria
   */
  categoryId?: string;

  /**
   * Identificador da conta
   */
  accountId: string;

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
