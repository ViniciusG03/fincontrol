// src/types/account.ts

/**
 * Enum que define os tipos possíveis de contas financeiras
 */
export enum AccountType {
  /**
   * Conta corrente tradicional
   */
  CHECKING = "CHECKING",

  /**
   * Conta de poupança
   */
  SAVINGS = "SAVINGS",

  /**
   * Cartão de crédito
   */
  CREDIT_CARD = "CREDIT_CARD",

  /**
   * Conta de investimentos
   */
  INVESTMENT = "INVESTMENT",

  /**
   * Dinheiro físico (carteira)
   */
  CASH = "CASH",

  /**
   * Outro tipo de conta
   */
  OTHER = "OTHER",
}

/**
 * Interface que define a estrutura de uma conta financeira
 */
export interface Account {
  /**
   * Identificador único da conta
   */
  id: string;

  /**
   * Nome da conta (ex: "Conta Corrente Banco XYZ")
   */
  name: string;

  /**
   * Tipo da conta
   */
  type: AccountType | string;

  /**
   * Saldo atual da conta
   */
  balance: number;

  /**
   * Código da moeda associada à conta (ISO 4217)
   */
  currency: string;

  /**
   * Cor personalizada para identificação visual da conta (opcional)
   */
  color?: string;

  /**
   * Ícone personalizado para a conta (opcional)
   */
  icon?: string;

  /**
   * Indica se esta é a conta padrão do usuário
   */
  isDefault: boolean;

  /**
   * Identificador do usuário proprietário da conta
   */
  userId: string;

  /**
   * Indica se o saldo desta conta deve ser incluído nos totais
   */
  includeInTotal: boolean;

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
 * Interface para cartões associados a contas
 */
export interface Card {
  /**
   * Identificador único do cartão
   */
  id: string;

  /**
   * Nome do cartão
   */
  name: string;

  /**
   * Últimos dígitos do número do cartão
   */
  lastDigits?: string;

  /**
   * Data de expiração do cartão
   */
  expiryDate?: Date;

  /**
   * Limite de crédito disponível
   */
  limit?: number;

  /**
   * Dia do fechamento da fatura
   */
  closingDay?: number;

  /**
   * Dia do vencimento da fatura
   */
  dueDay?: number;

  /**
   * Identificador da conta associada ao cartão
   */
  accountId: string;

  /**
   * Identificador do usuário proprietário do cartão
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
