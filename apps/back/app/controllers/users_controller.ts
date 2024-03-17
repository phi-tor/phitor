import type { HttpContext } from '@adonisjs/core/http'
import hash from "@adonisjs/core/services/hash"

import User from "#models/user"
import Follow from "#models/follow"
import {updateUserValidator} from "#validators/user_validator"

export default class UsersController {
  async me({ auth, response }: HttpContext){
    const userId = auth.getUserOrFail().id
    const user = await User
      .query()
      .where('id', userId)
      .preload('documents')
      .preload('profile')
      .preload('badges')
      .preload('likes')
      .preload('follows')
    return response.json(user)
  }

  async updateUser({ auth, request, response }: HttpContext){
    const user = auth.getUserOrFail()
    const data = request.body()
    const payload = await updateUserValidator.validate(data)

    if(!(await hash.verify(user.password, payload.password))) {
      return response.status(403).send({
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

  async followUser({ auth, request, response }: HttpContext){
    const user = auth.getUserOrFail()
    const userToFollowId = request.body()['userToFollowId']

    if(user.id === userToFollowId) return response.status(403).send({msg: "You can't follow yourself."})

    const followedByUser = await Follow.query()
      .where('user_id', user.id)
      .where('followed_id', userToFollowId)

    if(followedByUser[0] !== undefined) return response.status(403).send({msg: "User already followed."})

    const newFollow = await Follow.create({
      userId: user.id,
      followedId: userToFollowId,
      src: request.body()['src']
    })
    await newFollow.save()

    return response.status(201).send({msg: "User followed"})
  }

  async stopFollowingUser({ auth, params, response }: HttpContext){
    const user = auth.getUserOrFail()
    const follow = await Follow.query()
      .where('user_id', user.id)
      .where('followed_id', params['id'])
      .first()

    if(user.id !== follow?.userId) return response.status(403).send({msg: "You cannot remove another user's follow."})

    await follow.delete()

    return response.status(200).send({msg: "Follow removed"})
  }
}
