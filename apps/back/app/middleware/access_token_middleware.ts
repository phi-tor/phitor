import type {HttpContext} from '@adonisjs/core/http'
import type {NextFn} from '@adonisjs/core/types/http'

export default class AccessTokenMiddleware {
  /**
   * Get the access token from the `access_token` cookie and put it in a header for authenticate the request. The API
   * auth guard needs a header containing the token, and not a cookie.
   *
   * We stock the token in a cookie for security purposes (a token shouldn't be reachable by the client side JS).
   */
  async handle(ctx: HttpContext, next: NextFn) {
    const accessToken = ctx.request.cookie('access_token')
    ctx.request.request.headers["authorization"] = `Bearer ${accessToken}`

    return await next()
  }
}
