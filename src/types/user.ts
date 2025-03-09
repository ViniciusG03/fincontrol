// src/types/user.ts

/**
 * Representa as preferências de tema do usuário
 */
export type ThemePreference = "LIGHT" | "DARK" | "SYSTEM";

/**
 * Interface que define a estrutura de um usuário no sistema
 */
export interface User {
  /**
   * Identificador único do usuário
   */
  id: string;

  /**
   * Nome completo do usuário
   */
  name: string;

  /**
   * Endereço de e-mail do usuário (usado para login)
   */
  email: string;

  /**
   * URL para a imagem de avatar do usuário (opcional)
   */
  avatar?: string;

  /**
   * Código da moeda padrão para exibição de valores (ISO 4217)
   */
  currency: string;

  /**
   * Código do idioma preferido (formato BCP 47)
   */
  language: string;

  /**
   * Preferência de tema da interface
   */
  theme: ThemePreference;

  /**
   * Data e hora de criação do registro
   */
  createdAt: Date;

  /**
   * Data e hora da última atualização do registro
   */
  updatedAt: Date;
}
