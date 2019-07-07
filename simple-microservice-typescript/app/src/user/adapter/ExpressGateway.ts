import { Router } from 'express'
import { PersonStructure } from '../../user/entity/Person'
import { HttpProxyResponse } from '../../main/usecase/HttpProxyResponse'
import { PersonController } from '../../user/adapter/PersonController'

const router: Router = Router()

router.options('/', (request, response): void => {
  response.header('Content-Type', 'text/plain')
    .header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,DELETE').end()
})

router.get('/:id', async (request, response): Promise<void> => {
  response.header('Content-Type', 'application/json');
  (new PersonController()).find(request.params.id)
    .then((result): void => HttpProxyResponse.send<PersonStructure>(request, response, result))
    .catch((err): void => HttpProxyResponse.send<Error>(request, response, err))
})

router.post('/', (request, response): void => {
  response.header('Content-Type', 'application/json');
  (new PersonController()).create(request.body)
    .then((result): void => HttpProxyResponse.send<PersonStructure>(request, response, result))
    .catch((err): void => HttpProxyResponse.send<Error>(request, response, err))
})

router.delete('/:id', (request, response): void => {
  response.header('Content-Type', 'application/json');
  (new PersonController()).delete(request.params.id)
    .then((result): void => HttpProxyResponse.send<boolean>(request, response, result))
    .catch((err): void => HttpProxyResponse.send<Error>(request, response, err))
})

export = router
