import { Router } from 'express'

const router: Router = Router()

router.options('/', (request, response): void => {
  response.header('Content-Type', 'text/plain')
    .header('Access-Control-Allow-Methods', 'OPTIONS,GET').end()
})

router.get('/', (request, response): void => {
  response.header('Content-Type', 'application/json').send(process.env)
})

export = router;
