import { PersonStructure } from './Person'
import { PersonRead } from './PersonRead'
import { PersonCreate } from './PersonCreate'
import { PersonDelete } from './PersonDelete'

describe('Person', () => {
  let register: PersonStructure
  test('Create', async () => {
    const create = new PersonCreate()
    register = await create.registerRow({
      _id: '',
      firstname: 'Aardvark',
      lastname: 'da Silva',
      birthday: '1990-01-01'
    })
    expect(typeof (register)).toBe('object')
  })
  test('Find', async () => {
    const readRow = new PersonRead()
    const value = await readRow.findRow(register._id)
    expect(typeof (value)).toBe('object')
  })
  test('Delete', async () => {
    const deleteRow = new PersonDelete()
    const value = await deleteRow.deleteRow(register._id)
    expect(value).toBe(true)
  })
})
