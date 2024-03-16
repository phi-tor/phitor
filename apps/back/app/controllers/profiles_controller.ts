import type { HttpContext } from '@adonisjs/core/http'
import Profile from "#models/profile"
import {updateProfileValidator} from "#validators/profile_validator"

export default class ProfilesController {
  async get({ params, response }: HttpContext){
    const profile = await Profile.findOrFail(params['userId'])
    return response.json(profile.serialize())
  }

  /**
   * TODO: handle file upload for avatar, it's only supporting url now
   */
  async update({ auth, params, request, response }: HttpContext){
    const user = auth.getUserOrFail()
    const profile = await Profile.findOrFail(params['userId'])

    if(user.id !== profile.userId) return response.status(403).send({msg: "You can't update another user's profile"})

    const data = request.all()
    const payload = await updateProfileValidator.validate(data)

    profile.merge(payload)
    await profile.save()

    return response.json(profile.serialize())
  }
}
