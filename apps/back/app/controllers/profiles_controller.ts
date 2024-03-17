import type { HttpContext } from '@adonisjs/core/http'
import Profile from "#models/profile"
import {updateProfileValidator} from "#validators/profile_validator"
import ProfilePolicy from "#policies/profile_policy"

export default class ProfilesController {
  async get({ params, response }: HttpContext){
    const profile = await Profile.findOrFail(params['userId'])
    return response.json(profile.serialize())
  }

  /**
   * TODO: handle file upload for avatar, it's only supporting url now
   */
  async update({ bouncer, params, request, response }: HttpContext){
    const profile = await Profile.findOrFail(params['userId'])

    if(await bouncer.with(ProfilePolicy).denies('update', profile)) {
      return response.forbidden({msg: "You can't update another user's profile"})
    }

    const data = request.all()
    const payload = await updateProfileValidator.validate(data)

    profile.merge(payload)
    await profile.save()

    return response.json(profile.serialize())
  }
}
