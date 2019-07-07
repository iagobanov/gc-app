
import express from 'express'
import { resolve } from 'path'
import timeout from 'connect-timeout'
import { networkInterfaces } from 'os'
import { readdir, existsSync } from 'fs'
import { Environment } from '../../main/driver/Environment'

class Express {
  private server: express.Application
  public constructor () {
    this.server = express()
    this.defineBodyParser()
      .defineCors()
      .defineRoutes()
  }
  public listen (): void {
    this.defineRequestTimeoutLimit(Environment.SERVER_REQUEST_TIMEOUT)
    this.server.listen(Environment.SERVER_URI_PORT, (): void => console.info(`
            Server Start: ${(new Date())},
            Uri: ${networkInterfaces().eth0[0].address}:${Environment.SERVER_URI_PORT},
            Request Timeout Limit: ${Environment.SERVER_REQUEST_TIMEOUT}
            `))
  }
  private defineBodyParser (): Express {
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    return this
  }
  private defineCors (): Express {
    this.server.use((request: express.Request, response: express.Response,
      next: express.NextFunction): void => {
      response.statusCode = 200
      response.header('Access-Control-Allow-Origin', '*')
      response.header('Access-Control-Allow-Methods', request.method)
      response.header('Access-Control-Allow-Headers', 'Origin, Content-Type')
      next()
    })
    return this
  }
  private defineRoutes (): Express {
    const pathroot = resolve('./src')
    const fileroute = 'adapter/ExpressGateway'
    readdir(pathroot, (err, modules): void => {
      if (err) throw err
      modules.forEach((modulename): void => {
        const filename = `${pathroot}/${modulename}/${fileroute}.ts`
        const routename = (modulename === 'main') ? '' : modulename
        if (existsSync(filename)) {
          const uri = new Array<string>(`/${routename}`)
          this.server.use(uri, require(`../../${modulename}/${fileroute}`))
          if (routename) console.info(uri)
        }
      })
    })
    return this
  }
  private defineRequestTimeoutLimit (timeoutLimit: string): Express {
    const pattern = new RegExp(/^(\d{1,4})(ms|s)$/)
    if (!pattern.test(timeoutLimit)) timeoutLimit = '200ms'
    this.server.use(timeout(timeoutLimit))
    return this
  }
}

export { Express }