import { DateHandler, DatetimeHandler } from './CalendarHandler'
describe('CalendarHandler', () => {
  describe('DateHandler', () => {
    test('Valid', () => {
      const value = DateHandler.isValid('1990-01-01')
      expect(value).toBe(true)
    })
    test('Invalid', () => {
      const value = DateHandler.isValid('1990-01-01\T23:59:59')
      expect(value).toBe(false)
    })
  })
  describe('DatetimeHandler', () => {
    test('Valid', () => {
      const value = DatetimeHandler.isValid('1990-01-01\T23:59:59\+00:00')
      expect(value).toBe(true)
    })
    test('Invalid', () => {
      const value = DatetimeHandler.isValid('1990-01-01\T23:59:59')
      expect(value).toBe(false)
    })
  })
})
