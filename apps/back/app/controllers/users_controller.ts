import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async me({ auth, response }: HttpContext){
    const user = auth.getUserOrFail()
    return response.json(user.serialize())
  }
}
