// src/lib/format.ts
/**
 * Formata um valor numérico para o formato de moeda brasileira (BRL)
 * @param value - Valor a ser formatado
 * @param options - Opções de formatação
 * @returns String formatada como moeda
 */
export function formatCurrency(
  value: number,
  options: { currency?: string; locale?: string } = {}
): string {
  const { currency = "BRL", locale = "pt-BR" } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formata uma data para o formato brasileiro
 * @param date - Data a ser formatada
 * @param options - Opções de formatação
 * @returns String formatada como data
 */
export function formatDate(
  date: Date | string | number,
  options: { format?: "short" | "medium" | "long"; locale?: string } = {}
): string {
  const { format = "medium", locale = "pt-BR" } = options;

  // Garantir que temos um objeto Date
  const dateObject = date instanceof Date ? date : new Date(date);

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month:
      format === "short" ? "2-digit" : format === "medium" ? "short" : "long",
    year: format === "short" ? "2-digit" : "numeric",
  };

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObject);
}

/**
 * Formata um valor percentual
 * @param value - Valor decimal a ser formatado (ex: 0.15 para 15%)
 * @param options - Opções de formatação
 * @returns String formatada como percentual
 */
export function formatPercentage(
  value: number,
  options: {
    decimals?: number;
    includeSymbol?: boolean;
    locale?: string;
  } = {}
): string {
  const { decimals = 1, includeSymbol = true, locale = "pt-BR" } = options;

  const formatter = new Intl.NumberFormat(locale, {
    style: includeSymbol ? "percent" : "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value);
}

/**
 * Trunca ou abrevia um texto longo
 * @param text - Texto a ser truncado
 * @param maxLength - Comprimento máximo
 * @param suffix - Sufixo a ser adicionado (ex: "...")
 * @returns Texto truncado
 */
export function truncateText(
  text: string,
  maxLength: number = 30,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Formata um número com separadores de milhar
 * @param value - Número a ser formatado
 * @param options - Opções de formatação
 * @returns String formatada com separadores de milhar
 */
export function formatNumber(
  value: number,
  options: {
    decimals?: number;
    locale?: string;
  } = {}
): string {
  const { decimals = 0, locale = "pt-BR" } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
