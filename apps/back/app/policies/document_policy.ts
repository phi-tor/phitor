import User from '#models/user'
import Document from '#models/document'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class DocumentPolicy extends BasePolicy {
  read(currentUser: User, document: Document): AuthorizerResponse {
    return !(!document.isPublic && document.userId !== currentUser.id)
  }

  update(currentUser: User, document: Document): AuthorizerResponse {
    return currentUser.id === document.userId
  }

  delete(currentUser: User, document: Document): AuthorizerResponse {
    return currentUser.id === document.userId
  }
}
