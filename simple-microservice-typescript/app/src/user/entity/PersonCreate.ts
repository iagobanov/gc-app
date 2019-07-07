import { Database } from '../../database/Connect'
import { EntityCreate } from '../../main/entity/Entity'
import { PersonStructure } from '../../user/entity/Person'

class PersonCreate implements EntityCreate<PersonStructure, PersonStructure> {
  public registerRow (row: PersonStructure): Promise<PersonStructure> {
    return new Promise<PersonStructure>((resolve, reject): void => {
      delete row._id
      Database.person().then((collection): void => {
        collection.insertOne(row, (err, result): void => {
          if (err) reject(err)
          else resolve(result.ops[0])
        })
      }).catch((err): void => reject(err))
    })
  }
}

export { PersonCreate }
