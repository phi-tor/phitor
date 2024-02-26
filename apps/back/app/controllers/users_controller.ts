import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"

export default class UsersController {
  async me({ auth, response }: HttpContext){
    const userId = auth.getUserOrFail().id
    const user = await User
      .query()
      .where('id', userId)
      .preload('documents')
      .preload('profileId')
    return response.json(user)
  }
}
