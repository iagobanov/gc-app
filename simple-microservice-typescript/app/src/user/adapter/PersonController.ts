import { PersonRead } from '../../user/entity/PersonRead'
import { PersonCreate } from '../../user/entity/PersonCreate'
import { PersonDelete } from '../../user/entity/PersonDelete'
import { PersonStructure, Person } from '../../user/entity/Person'
import { ControllerRead, ControllerCreate, ControllerDelete } from '../../main/adapter/Controller'

class PersonController implements
  ControllerRead<string, PersonStructure>,
  ControllerCreate<PersonStructure, PersonStructure>,
  ControllerDelete<boolean> {
  public find (id: string): Promise<PersonStructure> {
    return new Promise<PersonStructure>(async (resolve, reject): Promise<void> => {
      (new PersonRead()).findRow(id)
        .then((result): void => resolve(result))
        .then((err): void => reject(err))
    })
  }
  public create (params: PersonStructure): Promise<PersonStructure> {
    return new Promise<PersonStructure>((resolve, reject): void => {
      const person = new Person(params);
      (new PersonCreate()).registerRow(person)
        .then((result): void => {
          resolve(result)
        })
        .catch((err): void => reject(err))
    })
  }
  public delete (id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject): Promise<void> => {
      (new PersonDelete()).deleteRow(id)
        .then((result): void => resolve(result))
        .then((err): void => reject(err))
    })
  }
}

export { PersonController }
