import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";
import {loginValidator, registerValidator} from "#validators/auth_validator";

export default class AuthController {
  async register({ auth, request, response }: HttpContext){
    const data = request.all()
    const payload = await registerValidator.validate(data)

    const user = await User.create({
      "username": payload.username,
      "email": payload.email,
      "password": payload.password,
      "lang": payload.lang
    })
    await auth.use('web').login(user)

    return response.redirect('/users/me')
  }
  async login({ request, auth, response }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)

    const user = await User.verifyCredentials(payload.email, payload.password)

    await auth.use('web').login(user)

    return response.redirect('/users/me')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/auth/login')
  }
}
