import { Express } from './main/driver/Express'
import { Database } from './database/Connect'

try {
  Database.seed();
  (new Express()).listen()
} catch (err) {
  console.error(err)
}
