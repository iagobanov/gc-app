import { Collection } from 'mongodb'
import { Database as Db } from '../main/driver/MongoDB'

import person = require('./person.json')

class Database {
  public static seed (): void {
    Database.person().catch((err): void => console.error(err))
  }
  public static person (): Promise<Collection> {
    return new Promise<Collection>((resolve, reject): void => {
      Db.collection('user', `person`, person)
        .then((collection): void => resolve(collection))
        .catch((err): void => reject(err))
    })
  }
}

export { Database }
