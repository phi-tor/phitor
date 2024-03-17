import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  unFollow(user: User, userToUnfollowId: number): AuthorizerResponse {
    return user.id === userToUnfollowId
  }
}
