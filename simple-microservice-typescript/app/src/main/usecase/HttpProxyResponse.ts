import { Request, Response } from 'express'
import { HttpProxyResponseStructure } from '../../main/entity/HttpProxyResponseStructure'

class HttpProxyResponse {
  public static send<ResultType> (request: Request, response: Response, result: ResultType): void {
    const statusCode: number = HttpProxyResponse.prepareStatusCode<ResultType>(result)
    const responseProxy: HttpProxyResponseStructure<ResultType | string> = {
      statusCode: statusCode,
      body: HttpProxyResponse.prepareBody<ResultType>(result)
    }
    response.statusCode = statusCode
    response.send(responseProxy)
  }
  private static prepareStatusCode<Input> (result: Input): number {
    let statusCode = 200
    if (result instanceof Error) {
      console.error(result)
      statusCode = HttpProxyResponse.parseError(result.message)
    }
    return statusCode
  }
  private static prepareBody<Input> (result: Input): Input | string {
    if (result instanceof Error) return result.message
    else if (result === null) return ''
    else return result
  }
  private static parseError (text: string): number {
    const invalid = new RegExp(/^(invalid_)(.*?)$/)
    if (invalid.test(text)) return 400
    return 500
  }
}

export { HttpProxyResponse }