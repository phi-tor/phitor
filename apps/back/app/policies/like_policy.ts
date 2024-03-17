import User from '#models/user'
import Like from '#models/like'
import Document from "#models/document"
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class LikePolicy extends BasePolicy {
  create(user: User, document: Document, isAlreadyLikedByUser: boolean): AuthorizerResponse {
    return user.id !== document.userId && !isAlreadyLikedByUser
  }

  delete(user: User, like: Like): AuthorizerResponse {
    return user.id === like.userId
  }
}
