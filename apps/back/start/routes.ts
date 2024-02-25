/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import AuthController from "#controllers/auth_controller"
import UsersController from "#controllers/users_controller"
import {middleware} from "#start/kernel"


router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('login', [AuthController, 'login']).as('login')

    router.post('register', [AuthController, 'register']).as('register')

    router.post('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('auth')
  .as('auth')

router
  .group(() => {
    router.get('me', [UsersController, 'me']).as('me')
  })
  .prefix('users')
  .as('users')
  .use(middleware.auth())
