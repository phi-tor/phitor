import type { HttpContext } from '@adonisjs/core/http'
import hash from "@adonisjs/core/services/hash"

import User from "#models/user"
import {updateUserValidator} from "#validators/user_validator"

export default class UsersController {
  async me({ auth, response }: HttpContext){
    const userId = auth.getUserOrFail().id
    const user = await User
      .query()
      .where('id', userId)
      .preload('documents')
      .preload('profileId')
      .preload('badges')
    return response.json(user)
  }

  async updateUser({ auth, request, response }: HttpContext){
    const user = auth.getUserOrFail()
    const data = request.body()
    const payload = await updateUserValidator.validate(data)

    if(!(await hash.verify(user.password, payload.password))) {
      return response.status(401).send({
        msg: "You must enter your current password to update your account (if you forgot it, click on 'I forgot my password' button)."
      })
    }

    user.merge({
      username: payload.username ? payload.username : undefined,
      email: payload.email ? payload.email : undefined,
      password: payload.newPassword ? payload.newPassword : undefined,
      lang: payload.lang ? payload.lang : undefined
    })
    await user.save()

    return response.status(200)
  }
}
