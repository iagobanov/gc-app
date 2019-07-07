import { Environment } from '../../main/driver/Environment'
import { MongoClient, Collection, MongoClientOptions, CollectionCreateOptions } from 'mongodb'

class Dbal {
  private static client: MongoClient
  public static connect (): Promise<MongoClient> {
    return new Promise<MongoClient>(async (resolve, reject): Promise<void> => {
      try {
        if (!(Dbal.client instanceof MongoClient)) {
          const url = `mongodb://${Environment.STORAGE_MONGO_HOSTNAME}:${Environment.STORAGE_MONGO_PORT}`
          const options: MongoClientOptions = {
            useNewUrlParser: true,
            poolSize: Environment.STORAGE_MONGO_CONNECT_POOL_SIZE,
            connectTimeoutMS: Environment.STORAGE_MONGO_CONNECT_TIMEOUT,
            auth: {
              user: Environment.STORAGE_MONGO_USERNAME,
              password: Environment.STORAGE_MONGO_PASSWORD
            }
          }
          Dbal.client = await MongoClient.connect(url, options)
        }
        Dbal.showStatus()
        resolve(Dbal.client)
      } catch (err) {
        reject(err)
      }
    })
  }
  private static async showStatus (): Promise<void> {
    if (Dbal.client instanceof MongoClient) {
      const adminDB = Dbal.client.db('admin').admin()
      const status = await adminDB.serverStatus()
    }
  }
}

class Seed {
  public static create (dbname: string, name: string, options: CollectionCreateOptions): Promise<Collection> {
    return new Promise<Collection>((resolve, reject): void => {
      Dbal.connect().then((client): void => {
        client.db(dbname).createCollection(name, options, (err, collection): void => {
          if (err) reject(err)
          else resolve(collection)
        })
      }).catch((err): void => reject(err))
    })
  }
}

class Database {
  public static collection (dbname: string, name: string, options: CollectionCreateOptions): Promise<Collection> {
    return new Promise<Collection>((resolve, reject): void => {
      Seed.create(dbname, name, options)
        .then((collection): void => resolve(collection))
        .catch((err): void => reject(err))
    })
  }
}

export { Database };
