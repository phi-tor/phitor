/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import {HttpContext} from "@adonisjs/core/http"

import AuthController from "#controllers/auth_controller"
import UsersController from "#controllers/users_controller"
import {middleware} from "#start/kernel"
import DocumentsController from "#controllers/documents_controller"
import ProfilesController from "#controllers/profiles_controller"


router.get('/', async () => {
  return {
    msg: "hey you! go on the app, you're not a fetch, do you?",
  }
})

router.get('/robots.txt', async ({ response }: HttpContext) => {
  response.header('Content-Type', 'text/plain')
  return response.send('User-agent: *\nDisallow: /')
})

// auth
router
  .group(() => {
    router.post('login', [AuthController, 'login']).as('login')

    router.post('register', [AuthController, 'register']).as('register')

    router.post('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('auth')
  .as('auth')

// users
router
  .group(() => {
    router.get('me', [UsersController, 'me']).as('me')

    router.group(() => {
      router.get(':userId', [ProfilesController, 'get']).as('get')

      router.put(':userId', [ProfilesController, 'update']).as('update')
    })
      .prefix('profiles')
      .as('profiles')
  })
  .prefix('users')
  .as('users')
  .use(middleware.auth())

// documents
router
  .group(() => {
    router.post('create', [DocumentsController, 'create']).as('create')

    router.get(':id', [DocumentsController, 'get']).as('get')

    router.get(':key/:value', [DocumentsController, 'getBy']).as('getBy')

    router.put(':id', [DocumentsController, 'update']).as('update')

    router.delete(':id', [DocumentsController, 'delete']).as('delete')
  })
  .prefix('documents')
  .as('documents')
  .use(middleware.auth())
