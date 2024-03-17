import User from '#models/user'
import Profile from '#models/profile'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ProfilePolicy extends BasePolicy {
  update(currentUser: User, profile: Profile): AuthorizerResponse {
    return currentUser.id === profile.userId
  }
}
