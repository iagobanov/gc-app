import { ObjectId } from 'bson'
import { Database } from '../../database/Connect'
import { EntityRead } from '../../main/entity/Entity'
import { PersonStructure } from '../../user/entity/Person'

class PersonRead implements EntityRead<PersonStructure, PersonStructure> {
  public findAll (options?: PersonStructure): Promise<PersonStructure[]> {
    return new Promise<PersonStructure[]>((resolve, reject): void => {
      Database.person().then((collection): void => {
        collection.find(options).toArray((err, result): void => {
          if (err) reject(err)
          else resolve(result)
        })
      }).catch((err): void => reject(err))
    })
  }
  public findRow (_id: string): Promise<PersonStructure> {
    return new Promise<PersonStructure>((resolve, reject): void => {
      Database.person().then((collection): void => {
        collection.findOne({ _id: new ObjectId(_id) }, (err, result): void => {
          if (err) reject(err)
          else resolve(result)
        })
      }).catch((err): void => reject(err))
    })
  }
}

export { PersonRead }
