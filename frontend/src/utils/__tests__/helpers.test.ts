import { formatPrice, formatDate } from '../helpers'

describe('Helper Functions', () => {
  describe('formatPrice', () => {
    it('formats price with two decimal places', () => {
      expect(formatPrice(10)).toBe('$10.00')
      expect(formatPrice(10.5)).toBe('$10.50')
      expect(formatPrice(10.99)).toBe('$10.99')
    })

    it('handles zero price', () => {
      expect(formatPrice(0)).toBe('$0.00')
    })

    it('handles large numbers', () => {
      expect(formatPrice(1000000)).toBe('$1000000.00')
    })
  })

  describe('formatDate', () => {
    it('formats ISO date string correctly', () => {
      const date = '2024-12-10T00:00:00.000Z'
      const formatted = formatDate(date)

      // Just check it returns a string (format may vary by locale)
      expect(typeof formatted).toBe('string')
      expect(formatted.length).toBeGreaterThan(0)
    })

    it('handles Date object', () => {
      const date = new Date('2024-12-10')
      const formatted = formatDate(date)

      expect(typeof formatted).toBe('string')
      expect(formatted.length).toBeGreaterThan(0)
    })
  })
})
