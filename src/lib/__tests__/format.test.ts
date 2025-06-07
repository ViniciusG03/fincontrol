import { formatCurrency, formatDate, formatPercentage, truncateText, formatNumber } from '../format';

describe('format utility functions', () => {
  describe('formatCurrency', () => {
    it('formats BRL currency by default', () => {
      expect(formatCurrency(1234.56)).toBe('R$\xa01.234,56');
    });

    it('respects locale and currency options', () => {
      expect(formatCurrency(1234.56, { currency: 'USD', locale: 'en-US' })).toBe('$1,234.56');
    });
  });

  describe('formatDate', () => {
    const date = new Date('2023-05-31T00:00:00Z');

    it('formats medium style by default', () => {
      expect(formatDate(date)).toBe('31 de mai. de 2023');
    });

    it('supports short format', () => {
      expect(formatDate(date, { format: 'short' })).toBe('31/05/23');
    });

    it('supports long format', () => {
      expect(formatDate(date, { format: 'long' })).toBe('31 de maio de 2023');
    });
  });

  describe('formatPercentage', () => {
    it('formats percentage with defaults', () => {
      expect(formatPercentage(0.123)).toBe('12,3%');
    });

    it('allows decimals and no symbol', () => {
      expect(formatPercentage(0.123, { decimals: 2, includeSymbol: false })).toBe('0,12');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      expect(truncateText('This is a long text that should be truncated', 10)).toBe('This is...');
    });

    it('returns original when shorter than limit', () => {
      expect(truncateText('short', 10)).toBe('short');
    });
  });

  describe('formatNumber', () => {
    it('formats number with default decimals', () => {
      expect(formatNumber(1234.56)).toBe('1.235');
    });

    it('supports custom decimals', () => {
      expect(formatNumber(1234.5, { decimals: 2 })).toBe('1.234,50');
    });
  });
});
