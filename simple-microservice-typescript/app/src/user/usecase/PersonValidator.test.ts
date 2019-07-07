import { PersonValidator } from './PersonValidator'

describe('PersonValidator', () => {
  test('validate', () => {
    const validator = new PersonValidator()
    const value = validator.validate({
      _id: '',
      firstname: 'Aardvark',
      lastname: 'da Silva',
      birthday: '1990-01-01'
    })
    expect(typeof (value)).toBe('object')
  })
})
