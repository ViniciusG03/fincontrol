// src/types/category.ts

/**
 * Interface que define a estrutura de uma categoria de transação
 */
export interface Category {
  /**
   * Identificador único da categoria
   */
  id: string;

  /**
   * Nome da categoria (ex: "Alimentação", "Transporte", etc.)
   */
  name: string;

  /**
   * Cor em formato hexadecimal para identificação visual da categoria
   */
  color: string;

  /**
   * Ícone personalizado para a categoria (opcional)
   */
  icon?: string;

  /**
   * Identificador do usuário proprietário da categoria
   */
  userId: string;

  /**
   * Identificador da categoria pai, quando é uma subcategoria (opcional)
   */
  parentId?: string;

  /**
   * Indica se esta é uma categoria padrão do sistema (não pode ser excluída)
   */
  isDefault: boolean;

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
 * Interface para representação de dados de uma categoria com valores agregados
 * Útil para relatórios e visualizações
 */
export interface CategorySummary {
  /**
   * Identificador único da categoria
   */
  id: string;

  /**
   * Nome da categoria
   */
  name: string;

  /**
   * Valor total das transações nesta categoria
   */
  amount: number;

  /**
   * Percentual que esta categoria representa do total
   */
  percentage: number;

  /**
   * Cor da categoria para visualização em gráficos
   */
  color: string;
}
