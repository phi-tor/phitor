import {HttpContext} from "@adonisjs/core/http"

import User from "#models/user"
import {loginValidator, registerValidator} from "#validators/auth_validator"
import Profile from "#models/profile"

export default class AuthController {
  async register({ response, request }: HttpContext){
    const data = request.body()
    const payload = await registerValidator.validate(data)

    const user = await User.create({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      lang: payload.lang,
    })
    await Profile.create({userId: user.id})
    const token = await User.accessTokens.create(user)

    response.cookie('access_token', `${token.value!.release()}`, {
      secure: process.env.NODE_ENV !== "development"
    })

    return response
  }

  async login({ response, request }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)

    const user = await User.verifyCredentials(payload.email, payload.password)
    const token = await User.accessTokens.create(user)

    response.cookie('access_token', `${token.value!.release()}`, {
      secure: process.env.NODE_ENV !== "development"
    })

    return response
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await User.accessTokens.delete(user, user.currentAccessToken!.identifier)

    return response.status(200).send({msg: 'Successfully logout'})
  }
}
